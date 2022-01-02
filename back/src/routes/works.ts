import express from 'express';
import { Op } from 'sequelize';
import { isAdmin, isLoggedIn } from '@/middlewares';
import { User, UserInfo, Work } from '@/models';
import type {
  CreateWorkRequestBody,
  QueryTypedRequest,
  UpdateWorkRequestBody,
  WorkState,
} from 'typings';

const router = express.Router();

/**
 * 오늘자 작업 가져오기
 */
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);

  try {
    const works = await Work.findAll({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
        },
      },
      order: [['createdAt', 'DESC']],
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
    res.status(200).json(works);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 작업 추가
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { UserId, ...workInfo }: CreateWorkRequestBody = req.body;

  try {
    let user: User | null = null;

    if (UserId) {
      user = await User.findByPk(UserId);

      if (!user) {
        res.status(400).json({
          message: '유효하지 않은 user id 입니다',
        });
        return;
      }
    }

    const work = await Work.create(workInfo);

    if (user) {
      await user.addWorks(work);
    }

    res.status(201).json({
      ...work,
      UserId: UserId || null,
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
  const { UserId }: UpdateWorkRequestBody = req.body;

  try {
    const work = await Work.findByPk(workId);

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }

    if (UserId) {
      const user = await User.findByPk(UserId);

      if (!user) {
        res.status(404).json({
          message: `id ${UserId} 유저를 찾을 수 없습니다`,
        });
        return;
      }
    }

    await work.update(req.body);

    const updatedWork = await Work.findByPk(workId, {
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
    res.status(200).json(updatedWork);
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
    const work = await Work.findByPk(workId);

    if (!work) {
      res.status(404).json({
        message: `id ${workId} work 를 찾을 수 없습니다`,
      });
      return;
    }

    await work.destroy();
    res.status(200).json(work);
  } catch (err) {
    next(err);
  }
});

export default router;
