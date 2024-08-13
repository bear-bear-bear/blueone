import dayjs from '@/utils/dayjs';

export const formatTime = (day: dayjs.Dayjs) => {
  const tomorrow = day.startOf('day').add(1, 'day');
  const tomorrowDate = tomorrow.format('YYYY-MM-DD');
  const todayStartMS = day.startOf('d').valueOf();
  const todayDate = day.format('YYYY-MM-DD');
  const threeDaysAgoDate = day.subtract(3, 'days').format('YYYY-MM-DD');
  const fourDaysLaterDate = day.add(3, 'days').format('YYYY-MM-DD');

  return {
    tomorrow,
    tomorrowDate,
    todayStartMS,
    todayDate,
    threeDaysAgoDate,
    fourDaysLaterDate,
  };
};
