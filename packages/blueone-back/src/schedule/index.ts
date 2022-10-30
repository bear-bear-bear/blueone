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
    cron: '30 0 0 * * ?',
    timezone: 'Asia/Seoul',
    callback: async () => {
      const yesterday = dayjs().subtract(1, 'days');
      const YESTERDAY_START = yesterday.startOf('day').toISOString();
      const YESTERDAY_END = yesterday.endOf('day').toISOString();

      try {
        const notDoneWorks = await Work.findAll({
          where: {
            remark: {
              [Op.or]: [{ [Op.ne]: '익일입고' }, { [Op.eq]: null }],
            },
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

        await Promise.all(
          notDoneWorks.map(async (work) => {
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
    cron: '30 0 0 * * ?',
    timezone: 'Asia/Seoul',
    callback: async () => {
      const todayStart = dayjs().startOf('day');
      const todayEnd = dayjs().endOf('day');

      try {
        const recentBookingWorks = await Work.findAll({
          where: {
            bookingDate: {
              [Op.and]: {
                [Op.gte]: todayStart.toISOString(),
                [Op.lte]: todayEnd.toISOString(),
              },
            },
          },
        });

        await Promise.all(
          recentBookingWorks.map(async (bookingWork) => {
            const newWork = omit(bookingWork.get(), ['id', 'bookingDate']);
            await work.create(newWork);
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
