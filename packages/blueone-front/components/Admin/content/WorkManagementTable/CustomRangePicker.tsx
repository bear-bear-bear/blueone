import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';
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
  const dayjsRange = useMemo(
    () => ({
      start: dayjs(dateRange.start),
      end: dayjs(dateRange.end),
    }),
    [dateRange],
  );

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
        Default: [dayjsRange.start, dayjsRange.end],
        Today: [today, today],
        'This Month': [today.startOf('month'), today],
      }}
      onChange={handleChange}
      value={[dayjsRange.start, dayjsRange.end]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default memo(CustomRangePicker);
