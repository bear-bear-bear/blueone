import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { DateRange } from '@app/admin/works/page';
import dayjs from '@utils/dayjs';

const { RangePicker } = DatePicker;

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  disabledDate?: RangePickerProps['disabledDate'];
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

  const handleChange = useCallback<NonNullable<RangePickerProps['onChange']>>(
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
      presets={[
        {
          label: 'Default',
          value: [dayjsRange.start, dayjsRange.end],
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
      value={[dayjsRange.start, dayjsRange.end]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default memo(CustomRangePicker);
