import { Dispatch, SetStateAction, useCallback } from 'react';
import { DatePicker } from 'antd';
import dayjs from '@/shared/lib/utils/dayjs';
import type { DateRange } from './page';

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
    (current: dayjs.Dayjs) =>
      // Can not select days before today and today
      current && current > dayjs().endOf('day'),
    [],
  );

  return (
    <RangePicker
      presets={[
        {
          label: 'Default',
          value: [today.subtract(7, 'days'), today],
        },
        {
          label: 'Today',
          value: [today, today],
        },
        {
          label: 'This Month',
          value: [today.startOf('month'), today],
        },
      ]}
      onChange={handleChange}
      defaultValue={[dayjs(dateRange.start), dayjs(dateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default CustomRangePicker;
