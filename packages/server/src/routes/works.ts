import express from 'express';
import type {
  CreateWorkRequestBody,
  QueryTypedRequest,
  UpdateWorkRequestBody,
  WorkState,
  DatePickQuery,
} from 'typings';
import { isContractor, isLoggedIn } from '@/middlewares';
import { User, UserInfo, Work } from '@/models';
import { withPayout } from '@/utils/calculate-payout';
import dayjs from '@/utils/dayjs';
import omit from '@/utils/omit';
import { getWorksByConditionallyAsBooking } from '@/utils/query/work';
import { ONE_DAY } from '@/utils/time';

const router = express.Router();

/**
 * 지정한 기간 내 업무 목록 가져오기
 */
router.get(
  '/',
  isLoggedIn,
  isContractor,
  async (
    req: QueryTypedRequest<DatePickQuery & { booked?: 'true' | 'false' }>,
    res,
    next,
  ) => {
    const today = dayjs();
    const { startDate = today, endDate = today, booked = 'false' } = req.query;

    const gte = dayjs(startDate).startOf('day').toISOString();
    const lte = dayjs(endDate).endOf('day').toISOString();

    try {
      const works = await getWorksByConditionallyAsBooking(
        gte,
        lte,
        booked === 'true',
      );

      res.status(200).json(works.map(withPayout));
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

/**
 * 업무 추가
 */
router.post('/', isLoggedIn, isContractor, async (req, res, next) => {
  const { userId, ...workInfo }: CreateWorkRequestBody = req.body;

  try {
    const work = await Work.create(workInfo);

    if (userId) {
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(400).json({
          message: '유효하지 않은 user id 입니다',
        });
        return;
      }

      await user.addWork(work);
    }

    res.status(201).json({
      ...withPayout(work),
      userId,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 업무 수정
 */
router.put('/:workId', isLoggedIn, isContractor, async (req, res, next) => {
  const { workId } = req.params;
  const { userId, ...workInfo }: UpdateWorkRequestBody = req.body;

  try {
    const work = await Work.findByPk(workId);

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }
    if (!!work.endTime && dayjs().diff(work.endTime).valueOf() > ONE_DAY) {
      res.status(403).json({
        message: '완료된지 24시간이 지난 업무는 수정할 수 없습니다.',
      });
      return;
    }

    Object.entries(workInfo).forEach(([key, value]) => {
      // @ts-expect-error
      work[key] = value;
    });

    if (userId !== work.userId) {
      if (userId) {
        const nextUser = await User.findByPk(userId);

        if (!nextUser) {
          res.status(404).json({
            message: `id ${userId} 유저를 찾을 수 없습니다`,
          });
          return;
        }

        await nextUser.addWork(work.id);
      }

      if (work.userId) {
        const prevUser = await User.findByPk(work.userId);

        await prevUser?.removeWork(work.id);
      }

      if (!!work.checkTime) {
        work.checkTime = null;
      }

      work.userId = userId;
    }

    const saved = await work.save();

    res.status(200).json(withPayout(saved));
  } catch (err) {
    next(err);
  }
});

/**
 * 업무 상태 수정
 */
router.patch(
  '/:workId',
  isLoggedIn,
  async (req: QueryTypedRequest<{ state: WorkState }>, res, next) => {
    const { workId } = req.params;
    const { state } = req.query;

    try {
      const work = await Work.findByPk(workId);

      if (!work) {
        res.status(404).json({
          message: `id ${workId} work 를 찾을 수 없습니다`,
        });
        return;
      }

      switch (state) {
        case 'checked':
          if (work.checkTime) {
            res.status(403).json({
              message: '이미 확인된 업무입니다.',
            });
            return;
          }
          work.checkTime = new Date();
          await work.save();
          break;
        case 'completed':
          if (work.endTime) {
            res.status(403).json({
              message: '이미 완료된 업무입니다.',
            });
            return;
          }
          work.endTime = new Date();
          await work.save();
          break;
        default:
          res.status(403).json({
            message: 'query 값이 유효하지 않습니다',
          });
          return;
      }

      res.status(200).json(withPayout(work));
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

/**
 * 예약 업무 강제 활성화
 */
router.patch(
  '/:workId/force-activate',
  isLoggedIn,
  isContractor,
  async (req, res, next) => {
    const { workId } = req.params;

    try {
      const bookingWork = await Work.findByPk(workId, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            },
            include: [
              {
                model: UserInfo,
                attributes: ['realname'],
              },
            ],
          },
        ],
      });

      if (!bookingWork) {
        res.status(404).json({
          message: `id ${workId} work 를 찾을 수 없습니다`,
        });
        return;
      }

      if (
        bookingWork.checkTime ||
        bookingWork.endTime ||
        !bookingWork.bookingDate
      ) {
        res.status(403).json({
          message: `이미 활성화된 업무입니다.`,
        });
        return;
      }

      const newWorkInfo = omit(
        bookingWork.get(),
        'id',
        'bookingDate',
        'createdAt',
        'updatedAt',
      );

      const newWork = await Work.create(newWorkInfo);

      await bookingWork.destroy();

      res.status(200).json(withPayout(newWork));
    } catch (err) {
      next(err);
    }
  },
);

/**
 * 업무 강제 종료
 */
router.patch(
  '/:workId/force-complete',
  isLoggedIn,
  isContractor,
  async (req, res, next) => {
    const { workId } = req.params;

    try {
      const work = await Work.findByPk(workId, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            },
            include: [
              {
                model: UserInfo,
                attributes: ['realname'],
              },
            ],
          },
        ],
      });

      if (!work) {
        res.status(404).json({
          message: `id ${workId} work 를 찾을 수 없습니다`,
        });
        return;
      }

      if (work.endTime) {
        res.status(403).json({
          message: `이미 완료된 업무입니다.`,
        });
        return;
      }

      if (!work.checkTime) {
        work.checkTime = new Date();
      }
      work.endTime = new Date();

      await work.save();

      res.status(200).json(withPayout(work));
    } catch (err) {
      next(err);
    }
  },
);

/**
 * 업무 삭제
 */
router.delete('/:workId', isLoggedIn, isContractor, async (req, res, next) => {
  const { workId } = req.params;

  try {
    const work = await Work.findByPk(workId);

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }

    await work.destroy();
    res.status(200).json(withPayout(work));
  } catch (err) {
    next(err);
  }
});

export default router;
