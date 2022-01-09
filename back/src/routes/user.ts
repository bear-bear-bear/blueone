import express from 'express';
import passport from 'passport';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, UserInfo, Work } from '@/models';
import { isLoggedIn, isNotLoggedIn } from '@/middlewares';
import dayjs from 'dayjs';
import { DatePickQuery, ISODateString, QueryTypedRequest } from 'typings';

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
      console.error('serverError', serverError);
      next(serverError);
      return;
    }

    if (clientError) {
      res.status(401).json(clientError);
      return;
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error('loginError', loginError);
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
    if (err) {
      console.error('세션 파괴 중 에러', err);
    }
    res.clearCookie('connect.sid');
    res.sendStatus(204);
  });
});

/**
 * 비밀번호 수정
 */
router.post('/password', isLoggedIn, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.update(
      { password: hashedPassword },
      { where: { id: req.user?.id } },
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/**
 * 오늘자 내 작업 리스트 가져오기
 */
router.get('/works', isLoggedIn, async (req, res, next) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);

  try {
    const activatedWorks = await Work.findAll({
      where: {
        UserId: req.user?.id,
        createdAt: {
          [Op.gt]: TODAY_START,
        },
      },
      order: [
        ['endTime', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    res.status(200).json(activatedWorks);
  } catch (err) {
    next(err);
  }
});

/**
 * 올해 혹은 이번달 내 업무의 최종지수 통계 가져오기
 */
router.get(
  '/works/analysis',
  isLoggedIn,
  async (req: QueryTypedRequest<{ by: 'day' | 'month' }>, res, next) => {
    const { by = 'day' } = req.query;

    const today = dayjs();
    const dayjsUnit = {
      day: 'month',
      month: 'year',
    } as const;
    const firstDateOfRange = today.startOf(dayjsUnit[by]).toISOString();

    try {
      const doneWorks = await Work.findAll({
        where: {
          UserId: req.user?.id,
          endTime: {
            [Op.ne]: null,
          },
          createdAt: {
            [Op.gt]: firstDateOfRange,
          },
        },
        attributes: {
          include: ['charge', 'subsidy', 'checkTime'],
        },
        order: [['createdAt', 'DESC']],
      });

      if (doneWorks.length === 0) {
        res.status(200).json([]);
        return;
      }

      const getPayout = (charge: Work['charge'], subsidy: Work['subsidy']) => {
        return ((charge + (subsidy ?? 0)) * 10) / 8;
      };

      const getWorksAnalysisAtThisMonth = async () => {
        const lastDayOfThisMonth = today.endOf('month').date();
        const dateMap = [...Array(lastDayOfThisMonth)].reduce<{
          [date: `${number}`]: 0;
        }>((acc, _, i) => {
          acc[`${i + 1}`] = 0;
          return acc;
        }, {});

        return doneWorks.reduce((acc, curr) => {
          const currWorkPayout = getPayout(curr.charge, curr.subsidy);
          const currDate = dayjs(curr.checkTime).date();
          dateMap[`${currDate}`] += currWorkPayout;
          return dateMap;
        }, dateMap);
      };

      const getWorksAnalysisAtThisYear = async () => {
        const monthMap = [...Array(12)].reduce<{
          [date: `${number}`]: 0;
        }>((acc, _, i) => {
          acc[`${i + 1}`] = 0;
          return acc;
        }, {});

        return doneWorks.reduce((acc, curr) => {
          const currWorkPayout = getPayout(curr.charge, curr.subsidy);
          const currMonth = dayjs(curr.checkTime).month() + 1; // dayjs month is 0~11
          monthMap[`${currMonth}`] += currWorkPayout;
          return monthMap;
        }, monthMap);
      };

      let worksAnalysis: { [dateOrMonth: `${number}`]: number };
      switch (by) {
        case 'day':
          worksAnalysis = await getWorksAnalysisAtThisMonth();
          break;
        case 'month':
          worksAnalysis = await getWorksAnalysisAtThisYear();
          break;
        default:
          worksAnalysis = await getWorksAnalysisAtThisMonth();
          break;
      }

      res.status(200).json(worksAnalysis);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
