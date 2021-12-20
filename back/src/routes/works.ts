import express from 'express';
import { isAdmin, isLoggedIn } from '@/routes/middlewares';
import { User, Work } from '@/models';
import type {
  CreateWorkRequestBody,
  QueryTypedRequest,
  PaginationQuery,
  UpdateWorkRequestBody,
  WorkState,
} from 'typings';

const router = express.Router();

/**
 * 활성화된 작업 리스트 가져오기
 */
router.get(
  '/',
  isLoggedIn,
  isAdmin,
  async (req: QueryTypedRequest<PaginationQuery>, res, next) => {
    const { per_page = '30', page = '1' } = req.query;

    const limit = parseInt(per_page, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    try {
      const activatedWorks = await Work.findAll({
        where: {
          endTime: null,
        },
        order: ['createdAt', 'DESC'],
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            },
          },
        ],
      });
      res.status(200).json(activatedWorks);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

/**
 * 작업 추가
 */
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId, ...workInfo }: CreateWorkRequestBody = req.body;

  try {
    let user: User | null = null;

    if (userId) {
      user = await User.findOne({ where: { id: userId } });

      if (!user) {
        res.status(400).json({
          message: '유효하지 않은 user id 입니다',
        });
        return;
      }
    }

    const work = await Work.create(workInfo);

    if (user) {
      await user.setWork(work);
    }

    res.status(201).json({
      ...work,
      userId: userId || null,
    });
  } catch (err) {
    console.error(err);
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
    const work = await Work.findOne({ where: { id: workId } });

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }

    if (userId) {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        res.status(404).json({
          message: `id ${userId} 유저를 찾을 수 없습니다`,
        });
        return;
      }

      await user.setWork(work);
    }

    await work.update({ workInfo });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
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
      const work = await Work.findOne({ where: { id: workId } });

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
              message: '이미 확인된 작업입니다.',
            });
          }
          work.checkTime = new Date();
          await work.save();
          break;
        case 'done':
          if (work.endTime) {
            res.status(403).json({
              message: '이미 완료된 작업입니다.',
            });
          }
          work.endTime = new Date();
          await work.save();
          break;
        default:
          res.status(403).json({
            message: 'query 값이 유효하지 않습니다',
          });
          break;
      }

      res.status(200).json(work);
    } catch (err) {
      console.error(err);
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
    const work = await Work.findOne({ where: { id: workId } });

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }

    await work.destroy();
    res.status(200).json(work);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
