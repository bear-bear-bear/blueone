import express from 'express';
import _ from 'lodash';
import { isAdmin, isLoggedIn } from '@/middlewares';
import { User, UserInfo, Work } from '@/models';
import type {
  CreateUserRequestBody,
  PaginationQuery,
  UpdateUserRequestBody,
  QueryTypedRequest,
} from 'typings';

const router = express.Router();

/**
 * 유저 리스트 가져오기
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
      const users = await User.findAll({
        order: ['createdAt', 'DESC'],
        limit,
        offset,
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: UserInfo,
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: Work,
          },
        ],
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

/**
 * 유저 추가
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { phoneNumber, ...restUserInfo }: CreateUserRequestBody = req.body;
  const INITIAL_PASSWORD = 1234;

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { phoneNumber },
      defaults: {
        role: 'user',
        phoneNumber,
        password: INITIAL_PASSWORD,
        UserInfo: restUserInfo,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [UserInfo],
    });

    if (!isCreated) {
      res.status(409).json({
        message: '이미 사용 중인 전화번호입니다.',
      });
    }

    res.status(202).json({
      ...user,
      restUserInfo,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 어드민 추가 (임시)
 */
router.post('/admin', async (req, res, next) => {
  const { phoneNumber } = req.body;
  const INITIAL_PASSWORD = 1234;

  try {
    const [admin, isCreated] = await User.findOrCreate({
      where: { phoneNumber },
      defaults: {
        role: 'admin',
        phoneNumber,
        password: INITIAL_PASSWORD,
      },
    });

    if (!isCreated) {
      res.status(409).json({
        message: '이미 사용 중인 전화번호입니다.',
      });
    }

    const omitPassword = (user: User) => _.omitBy(user, (value, key) => key === 'password')
    res.status(202).json(omitPassword(admin.get()));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 유저 가져오기
 */
router.get('/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: UserInfo,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Work,
        },
      ],
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 유저 수정
 */
router.put('/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { phoneNumber, ...restInfo }: UpdateUserRequestBody = req.body;

  try {
    await User.update({ phoneNumber }, { where: { id: userId } });
    await UserInfo.update(restInfo, { where: { userId } });

    const updatedUser = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: UserInfo,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Work,
        },
      ],
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 유저 삭제
 */
router.delete('/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: {
        userId,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      res.status(404).json({
        message: `id ${userId} 유저를 찾을 수 없습니다`,
      });
      return;
    }

    await user.destroy();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 활성화된 유저 작업 가져오기
 */
router.get('/works', isLoggedIn, async (req, res, next) => {
  try {
    const activatedWorks = await Work.findAll({
      where: {
        userId: req.user?.id,
        endTime: null,
      },
      order: ['createdAt', 'DESC'],
    });
    res.status(200).json(activatedWorks);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
