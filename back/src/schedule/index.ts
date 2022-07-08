import schedule from 'node-schedule-tz';
import logger from '@/utils/logger';
import { Work } from '@/models';
import { Op } from 'sequelize';
import dayjs from 'dayjs';

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
    name: 'adjust booking deadline',
    cron: '30 0 0 * * ?',
    timezone: 'Asia/Seoul',
    callback: async () => {
      const TODAY = dayjs().format();
      try {
        const recentBookingWorks = await Work.findAll({
          where: {
            bookingDate: {
              [Op.lte]: TODAY,
            },
          },
        });
        await Promise.all(
          recentBookingWorks.map(async bookingWork => {
            bookingWork.bookingDate = null;
            await bookingWork.save();
          })
        );
      } catch (err) {
        logger.error(err);
      }
    },
  },
];

export default () => {
  jobs.forEach((job) => {
    schedule.scheduleJob(job.name, job.cron, job.timezone, async () => {
      logger.info(`[Run job] ${job.name}`);
      await job.callback();
    });
  });
};
