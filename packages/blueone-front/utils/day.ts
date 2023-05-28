import dayjs from '@utils/dayjs';

export const formatTime = (day: dayjs.Dayjs) => {
  const tomorrow = day.startOf('day').add(1, 'day');
  const todayStartMS = day.startOf('d').valueOf();
  const todayDate = day.format('YYYY-MM-DD');
  const threeDaysAgoDate = day.subtract(3, 'days').format('YYYY-MM-DD');
  const threeDaysLaterDate = day.add(3, 'days').format('YYYY-MM-DD');

  return {
    tomorrow,
    todayStartMS,
    todayDate,
    threeDaysAgoDate,
    threeDaysLaterDate,
  };
};
