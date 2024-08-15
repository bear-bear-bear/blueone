import { Dispatch, SetStateAction } from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { DateRange } from '@/shared/api/types';
import './range-picker.component.css';

const { RangePicker } = DatePicker;

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

export default function CustomRangePicker({ dateRange, setDateRange }: Props) {
  const today = dayjs();

  const handleChange: NonNullable<RangePickerProps['onChange']> = (_, [startDate, endDate]) => {
    setDateRange({
      startDate,
      endDate,
    });
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    if (!current) {
      return false;
    }

    const tooEarly = today.diff(current, 'days') > 100; // 100일 이전
    const tooLate = current > dayjs().endOf('day'); // 오늘 이후

    return tooEarly || tooLate;
  };

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
      defaultValue={[dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
      disabledDate={disabledDate}
      allowClear={false}
      size="large"
      className="w-full"
    />
  );
}
