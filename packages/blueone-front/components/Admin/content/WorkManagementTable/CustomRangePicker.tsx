import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { PickerProps, RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { RangePicker } from '@components/Admin/content/commonParts/Picker';
import dayjs from '@utils/dayjs';
import type { DateRange } from './index';

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  disabledDate?: PickerProps<dayjs.Dayjs>['disabledDate'];
};

const CustomRangePicker = ({ dateRange, setDateRange, disabledDate }: Props) => {
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

  return (
    <RangePicker
      ranges={{
        Default: [today.subtract(3, 'days'), today],
        Today: [today, today],
        'This Month': [today.startOf('month'), today],
      }}
      onChange={handleChange}
      value={[dayjs(dateRange.start), dayjs(dateRange.end)]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default memo(CustomRangePicker);
