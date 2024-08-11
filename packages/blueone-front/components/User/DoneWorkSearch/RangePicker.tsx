import { Dispatch, SetStateAction, useCallback } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DateRange } from './index';

const { RangePicker } = DatePicker;

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
      presets={[
        {
          label: '오늘',
          value: [today, today],
        },
        {
          label: '이번 주',
          value: [today.startOf('week'), today],
        },
        {
          label: '이번 달',
          value: [today.startOf('month'), today],
        },
      ]}
      onChange={handleChange}
      defaultValue={[dayjs(dateRange.start), dayjs(dateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
      size="large"
    />
  );
};

export default CustomRangePicker;
