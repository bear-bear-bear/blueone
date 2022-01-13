import { Dispatch, SetStateAction, useCallback } from 'react';
import dayjs from 'dayjs';
import RangePicker from '@components/Admin/content/commonParts/RangePicker';
import type { DateRange } from './index';

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const CustomDatePicker = ({ dateRange, setDateRange }: Props) => {
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
      ranges={{
        Default: [today.subtract(7, 'days'), today],
        Today: [today, today],
        'This Month': [today.startOf('month'), today],
      }}
      onChange={handleChange}
      defaultValue={[dayjs(dateRange.start), dayjs(dateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default CustomDatePicker;
