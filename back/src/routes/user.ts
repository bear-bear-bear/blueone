import express from 'express';
import { User, UserInfo } from '@/models';
import { isLoggedIn, isNotLoggedIn } from './middlewares';
import passport from 'passport';

const router = express.Router();

export const getFullUserWithoutPassword = (user: User): Promise<User | null> =>
  User.findOne({
    where: { id: user.id },
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

/**
 * 유저 확인
 */
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUser = await getFullUserWithoutPassword(req.user);
      res.status(200).json(fullUser);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 로그인
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, user, clientError) => {
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }

    if (clientError) {
      return res.status(401).json(clientError);
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const fullUser = await getFullUserWithoutPassword(user);
      return res.status(200).json(fullUser);
    });
  })(req, res, next);
});

/**
 * 로그아웃
 */
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    console.error('세션 파괴 도중 에러 발생', err);
    res.status(500).json({
      message: 'Server error',
    });
  });
  res.status(200).json({
    message: '로그아웃 완료',
  });
});

/**
 * 비밀번호 수정
 */
router.patch('/password', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      { password: req.body.password },
      { where: { id: req.user?.id } },
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
