import express from 'express';
import { isAdmin, isLoggedIn } from '@/routes/middlewares';
import { User, UserInfo, Work } from '@/models';
import { CreateUserRequestBody, UpdateUserRequestBody } from '../../typings';

const router = express.Router();

/**
 * 유저 리스트 가져오기
 */
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { per_page = '30', page = '1' } = req.params;

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
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 유저 추가
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { phoneNumber, ...restInfo }: CreateUserRequestBody = req.body;
  const INITIAL_PASSWORD = 1234;

  try {
    const exUser = await User.findOne({ where: { phoneNumber } });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 전화번호입니다.');
    }

    const user = await User.create({
      role: 'user',
      phoneNumber,
      password: INITIAL_PASSWORD,
    });
    const userInfo = await UserInfo.create(restInfo);
    await user.setUserInfo(userInfo);
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
    const user = await User.findOne({ where: { id: userId } });
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
    res.sendStatus(204);
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
    });

    if (!user) {
      res.status(404).json({
        message: `${userId} 유저를 찾을 수 없습니다`,
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
