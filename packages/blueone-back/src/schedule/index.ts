import { omit } from 'lodash';
import schedule from 'node-schedule-tz';
import { Op } from 'sequelize';
import { Work } from '@/models';
import work from '@/models/work';
import dayjs from '@/utils/dayjs';
import logger from '@/utils/logger';

const jobs = [
  {
    name: 'Adjust subsidy penalty',
    cron: '30 0 0 * * ?', // 매일 00시 30초에
    timezone: 'Asia/Seoul',
    callback: async () => {
      const yesterday = dayjs().subtract(1, 'days');
      const YESTERDAY_START = yesterday.startOf('day').toISOString();
      const YESTERDAY_END = yesterday.endOf('day').toISOString();

      try {
        const notDoneWorks = await Work.findAll({
          where: {
            createdAt: {
              [Op.gt]: YESTERDAY_START,
              [Op.lt]: YESTERDAY_END,
            },
            checkTime: {
              [Op.ne]: null,
            },
            endTime: {
              [Op.eq]: null,
            },
            penalty: {
              [Op.eq]: false,
            },
          },
        });

        const PENALTY_EXCLUSION_WORDS = ['익일', '입고'];

        const hasPenaltyExclusionWordInRemark = ({ remark }: Work) => {
          if (!remark) return false;

          return PENALTY_EXCLUSION_WORDS.some((keyword) =>
            remark.includes(keyword),
          );
        };

        await Promise.all(
          notDoneWorks
            .filter((work) => {
              return !hasPenaltyExclusionWordInRemark(work);
            })
            .map(async (work) => {
              work.subsidy = (work.subsidy ?? 0) - 10;
              work.penalty = true;

              await work.save();
            }),
        );
      } catch (err) {
        logger.error(err);
      }
    },
  },
  {
    name: 'Adjust booking deadline',
    cron: '30 0 0/1 * * ?', // 매 시간 30초에
    timezone: 'Asia/Seoul',
    callback: async () => {
      const hourStart = dayjs().startOf('hour');
      const hourEnd = dayjs().endOf('hour');

      try {
        const recentBookingWorks = await Work.findAll({
          where: {
            bookingDate: {
              [Op.and]: {
                [Op.gte]: hourStart.toISOString(),
                [Op.lte]: hourEnd.toISOString(),
              },
            },
          },
        });

        await Promise.all(
          recentBookingWorks.map(async (bookingWork) => {
            const newWorkInfo = omit(bookingWork.get(), [
              'id',
              'bookingDate',
              'createdAt',
              'updatedAt',
            ]);
            await work.create(newWorkInfo);
            await bookingWork.destroy();
          }),
        );
      } catch (err) {
        logger.error(err);
      }
    },
  },
];

export default () => {
  jobs.forEach(({ name, cron, timezone, callback }) => {
    schedule.scheduleJob(name, cron, timezone, async () => {
      logger.info(`[Run job] ${name}`);
      await callback();
    });
  });
};
