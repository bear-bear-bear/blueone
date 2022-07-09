import { Dispatch, SetStateAction, useCallback } from 'react';

import dayjs from 'dayjs';

import type { DateRange } from './index';

import { RangePicker } from '@components/Admin/content/commonParts/Picker';

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const CustomRangePicker = ({ dateRange, setDateRange }: Props) => {
  const today = dayjs();

  const handleChange = useCallback(
    (_: unknown, [startDate, endDate]: [string, string]) => {
      setDateRange({
        start: startDate,
        end: endDate,
      });
    },
    [setDateRange],
  );

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      if (!current) {
        return false;
      }

      const tooEarly = today.diff(current, 'days') > 100; // 100일 이전
      const tooLate = current > dayjs().endOf('day'); // 오늘 이후

      return tooEarly || tooLate;
    },
    [today],
  );

  return (
    <RangePicker
      ranges={{
        오늘: [today, today],
        '이번 주': [today.startOf('week'), today],
        '이번 달': [today.startOf('month'), today],
      }}
      onChange={handleChange}
      defaultValue={[dayjs(dateRange.start), dayjs(dateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
      size="large"
    />
  );
};

export default CustomRangePicker;
