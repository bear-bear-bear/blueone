import type { FullWork } from '@app/admin/works/page';
import dayjs from '@utils/dayjs';

export default function processWorkDateTimes(work: FullWork) {
  const processToTime = (dateISOString: string | null) => {
    if (dateISOString === null) return '-';

    const time = dayjs(dateISOString);
    const timeDayStart = time.startOf('day').valueOf();
    const createdAtDayStart = dayjs(work.createdAt).startOf('day').valueOf();

    return time.format(timeDayStart === createdAtDayStart ? 'HH:mm' : 'MM/DD_HH:mm');
  };

  const processToDate = (dateISOString: string | null, withT?: boolean) => {
    if (dateISOString === null) return '-';

    const time = dayjs(dateISOString);
    const thisYear = dayjs().year();

    if (withT) {
      return time.format(time.year() === thisYear ? 'MM/DD HH:00' : 'YYYY/MM/DD HH:00');
    }
    return time.format(time.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD');
  };

  return {
    processedCheckTime: processToTime(work.checkTime),
    processedEndTime: processToTime(work.endTime),
    processedCreatedAt: processToDate(work.createdAt),
    processedUpdatedAt: processToDate(work.updatedAt),
    processedBookingDate: processToDate(work.bookingDate, true),
  };
}
