import schedule from 'node-schedule-tz';
import { Op } from 'sequelize';
import { Work } from '@/models';
import work from '@/models/work';
import dayjs from '@/utils/dayjs';
import logger from '@/utils/logger';
import omit from '@/utils/omit';

const jobs = [
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
            const newWorkInfo = omit(
              bookingWork.get(),
              'id',
              'bookingDate',
              'createdAt',
              'updatedAt',
            );
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

export default function runJobs() {
  jobs.forEach(({ name, cron, timezone, callback }) => {
    schedule.scheduleJob(name, cron, timezone, async () => {
      logger.info(`[Run job] ${name}`);
      await callback();
    });
  });
}
