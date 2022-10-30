import { Op } from 'sequelize';
import { User, UserInfo, Work } from '@/models';

/**
 * @param gt string 형식의 날짜 데이터입니다. ( greater then )
 * @param lt string 형식의 날짜 데이터입니다. ( less then )
 * @param booked 예약된 작업 정보를 표시할지에 대한 bool 값입니다.
 * @description 날짜 데이터를 받아 해당하는 날짜 범위의 예약 작업 또는 작업 데이터를 조회하여 반환합니다.
 */
export const getWorksByConditionallyAsBooking = async (
  gt: string,
  lt: string,
  booked = false,
) => {
  const where = booked
    ? {
        bookingDate: {
          [Op.ne]: null,
          [Op.gt]: gt,
          [Op.lt]: lt,
        },
      }
    : {
        createdAt: {
          [Op.gt]: gt,
          [Op.lt]: lt,
        },
        bookingDate: {
          [Op.eq]: null,
        },
      };

  return await Work.findAll({
    where,
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
};

/**
 * @description work 관련 Sequelize Query 에서 기본 Where 옵션을 부여합니다.
 */
export const getDefaultWhereParamsQueriedByWork = () => ({
  bookingDate: {
    [Op.eq]: null,
  },
});
