import { Dispatch, SetStateAction, useCallback } from 'react';
import { RangePicker } from '@components/Admin/content/commonParts/Picker';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { DateRange } from './index';
import dayjs from '@utils/day';

type Props = {
  defaultDateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const CustomRangePicker = ({ defaultDateRange, setDateRange }: Props) => {
  const today = dayjs();

  const handleChange: RangePickerProps<dayjs.Dayjs>['onChange'] = useCallback(
    (_, [startDate, endDate]) => {
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
        Default: [today.subtract(3, 'days'), today],
        Today: [today, today],
        'This Month': [today.startOf('month'), today],
      }}
      onChange={handleChange}
      defaultValue={[dayjs(defaultDateRange.start), dayjs(defaultDateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default CustomRangePicker;
