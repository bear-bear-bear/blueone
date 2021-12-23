import express from 'express';
import passport from 'passport';
import { User, UserInfo } from '@/models';
import { isLoggedIn, isNotLoggedIn } from '@/middlewares';

const router = express.Router();

/**
 * 유저 확인
 */
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({
        isLoggedIn: false,
      });
      return;
    }

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: UserInfo,
          attributes: {
            include: ['realname', 'licenseType', 'insuranceExpirationDate'],
          },
        },
      ],
    });

    if (!user) {
      res.status(401).json({
        isLoggedIn: false,
      });
      return;
    }

    res.status(200).json({
      ...user.get(),
      isLoggedIn: true,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 로그인
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, user, clientError) => {
    if (serverError) {
      next(serverError);
      return;
    }

    if (clientError) {
      res.status(401).json(clientError);
      return;
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      const fullUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: UserInfo,
            attributes: {
              include: ['realname', 'licenseType', 'insuranceExpirationDate'],
            },
          },
        ],
      });
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
    next(err);
  }
});

export default router;
