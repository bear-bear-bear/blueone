import { Dispatch, SetStateAction } from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { DateRange } from '@/shared/api/types';
import dayjs from '@/shared/lib/utils/dayjs';

const { RangePicker } = DatePicker;

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

export default function CustomRangePicker({ dateRange, setDateRange }: Props) {
  const today = dayjs();

  const handleChange: NonNullable<RangePickerProps['onChange']> = (_, [startDate, endDate]) => {
    setDateRange({
      startDate: startDate,
      endDate: endDate,
    });
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

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
      defaultValue={[dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
}
