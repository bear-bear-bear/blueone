import * as process from 'process';
import bcrypt from 'bcrypt';
import express from 'express';
import _ from 'lodash';
import type { CreateUserRequestBody, UpdateUserRequestBody } from 'typings';
import { isAdmin, isLoggedIn } from '@/middlewares';
import { User, UserInfo, Work } from '@/models';
import { withPayout } from '@/utils/calculatePayout';
import { getDefaultWhereParamsQueriedByWork } from '@/utils/query/work';

const router = express.Router();
const omitPassword = (user: User) =>
  _.omitBy<Omit<User, 'password'>>(user, (_value, key) => key === 'password');

/**
 * 유저 리스트 가져오기
 */
router.get('/', isLoggedIn, isAdmin, async (_req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: {
        exclude: ['password'],
      },
      include: [UserInfo, Work],
      order: [[UserInfo, 'realname', 'ASC']],
    });
    res.status(200).json(users.map((user) => user.get()));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 유저 추가
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { phoneNumber, ...restUserInfo }: CreateUserRequestBody = req.body;
  const INITIAL_PASSWORD = '1234';

  try {
    const hashedPassword = await bcrypt.hash(INITIAL_PASSWORD, 10);
    const [user, isCreated] = await User.findOrCreate({
      where: { phoneNumber },
      defaults: {
        role: 'user',
        phoneNumber,
        password: hashedPassword,
        UserInfo: restUserInfo,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [UserInfo, Work],
    });

    if (!isCreated) {
      res.status(409).json({
        message: '이미 사용 중인 전화번호입니다.',
      });
      return;
    }

    res.status(202).json(omitPassword(user.get()));
  } catch (err) {
    next(err);
  }
});

/**
 * 어드민 추가
 */
router.post('/admin', async (req, res, next) => {
  try {
    const { adminCreateKey, phoneNumber, password } = req.body;

    if (adminCreateKey !== process.env.ADMIN_CREATE_KEY) {
      res.status(403).json({
        message: '생성 키가 일치하지 않습니다.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [admin, isCreated] = await User.findOrCreate({
      where: { phoneNumber },
      defaults: {
        role: 'admin',
        phoneNumber,
        password: hashedPassword,
      },
    });

    if (!isCreated) {
      res.status(409).json({
        message: '이미 사용 중인 전화번호입니다.',
      });
      return;
    }

    res.status(202).json(omitPassword(admin.get()));
  } catch (err) {
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
      include: [UserInfo, Work],
    });

    if (!user) {
      res.status(404).json({
        message: '존재하지 않는 유저입니다.',
      });
      return;
    }

    res.status(200).json(user.get());
  } catch (err) {
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
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({
        message: '존재하지 않는 유저입니다.',
      });
      return;
    }

    await user.update({ phoneNumber });
    await UserInfo.update(restInfo, { where: { userId } });

    const updatedUser = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password'],
      },
      include: [UserInfo, Work],
    });

    res.status(200).json(updatedUser?.get());
  } catch (err) {
    next(err);
  }
});

/**
 * 유저 삭제
 */
router.delete('/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
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
    res.status(200).json(user.get());
  } catch (err) {
    next(err);
  }
});

/**
 * 활성화된 유저 작업 가져오기
 */
router.get('/:userId/works', isLoggedIn, isAdmin, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const activatedWorks = await Work.findAll({
      where: {
        ...getDefaultWhereParamsQueriedByWork(),
        userId,
        endTime: null,
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(activatedWorks.map(withPayout));
  } catch (err) {
    next(err);
  }
});

export default router;
