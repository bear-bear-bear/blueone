import express from 'express';
import { omit } from 'lodash';
import type {
  CreateWorkRequestBody,
  QueryTypedRequest,
  UpdateWorkRequestBody,
  WorkState,
  DatePickQuery,
} from 'typings';
import { isAdmin, isLoggedIn } from '@/middlewares';
import { User, UserInfo, Work } from '@/models';
import { withPayout } from '@/utils/calculatePayout';
import dayjs from '@/utils/dayjs';
import { getWorksByConditionallyAsBooking } from '@/utils/query/work';

const router = express.Router();

/**
 * 지정한 기간 내 작업 목록 가져오기
 */
router.get(
  '/',
  isLoggedIn,
  isAdmin,
  async (
    req: QueryTypedRequest<DatePickQuery & { booked?: 'true' | 'false' }>,
    res,
    next,
  ) => {
    const today = dayjs();
    const { start = today, end = today, booked = 'false' } = req.query;

    const gte = dayjs(start).startOf('day').toISOString();
    const lte = dayjs(end).endOf('day').toISOString();

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
 * 작업 추가
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
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
 * 작업 수정
 */
router.put('/:workId', isLoggedIn, isAdmin, async (req, res, next) => {
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

    Object.entries(workInfo).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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

      work.userId = userId;
    }

    const saved = await work.save();

    res.status(200).json(withPayout(saved));
  } catch (err) {
    next(err);
  }
});

/**
 * 작업 상태 수정
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
        case 'init':
          if (work.endTime) {
            res.status(403).json({
              message: '완료된 작업은 초기화할 수 없습니다.',
            });
            return;
          }
          work.checkTime = null;
          work.bookingDate = null;
          await work.save();

          break;
        case 'checked':
          if (work.checkTime) {
            res.status(403).json({
              message: '이미 확인된 작업입니다.',
            });
            return;
          }
          work.checkTime = new Date();
          await work.save();
          break;
        case 'done':
          if (work.endTime) {
            res.status(403).json({
              message: '이미 완료된 작업입니다.',
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
 * 예약 작업 강제 활성화
 */
router.patch(
  '/:workId/force-activate',
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    const { workId } = req.params;
    const { userId }: UpdateWorkRequestBody = req.body;

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

      if (userId) {
        const user = await User.findByPk(userId);

        if (!user) {
          res.status(404).json({
            message: `id ${userId} 유저를 찾을 수 없습니다`,
          });
          return;
        }
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

      const newWorkInfo = omit(bookingWork.get(), [
        'id',
        'bookingDate',
        'createdAt',
        'updatedAt',
      ]);

      const newWork = await Work.create(newWorkInfo);

      await bookingWork.destroy();

      res.status(200).json(withPayout(newWork));
    } catch (err) {
      next(err);
    }
  },
);

/**
 * 작업 강제 종료
 */
router.patch(
  '/:workId/force-finish',
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    const { workId } = req.params;
    const { userId }: UpdateWorkRequestBody = req.body;

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

      if (userId) {
        const user = await User.findByPk(userId);

        if (!user) {
          res.status(404).json({
            message: `id ${userId} 유저를 찾을 수 없습니다`,
          });
          return;
        }
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
 * 작업 삭제
 */
router.delete('/:workId', isLoggedIn, isAdmin, async (req, res, next) => {
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
