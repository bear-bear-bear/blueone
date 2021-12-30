import express from 'express';
import passport from 'passport';
import { User, UserInfo, Work } from '@/models';
import { isLoggedIn, isNotLoggedIn } from '@/middlewares';

const router = express.Router();

/**
 * 유저 확인
 */
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id },
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
      res.status(404).json({
        message: '세션 정보로 유저를 찾을 수 없습니다.',
      });
      return;
    }

    res.status(200).json(user);
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

/**
 * 활성화된 내 작업 가져오기
 */
router.get('/works', isLoggedIn, async (req, res, next) => {
  try {
    const activatedWorks = await Work.findAll({
      where: {
        UserId: req.user?.id,
        endTime: null,
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(activatedWorks);
  } catch (err) {
    next(err);
  }
});

export default router;
