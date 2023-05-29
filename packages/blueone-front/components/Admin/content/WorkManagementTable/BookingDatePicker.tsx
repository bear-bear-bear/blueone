import { useState } from 'react';
import { DatePicker } from '@components/Admin/content/commonParts/Picker';
import dayjs from '@utils/dayjs';

type Props = {
  date: dayjs.Dayjs;
  setDate: (data: dayjs.Dayjs) => void;
};

const BookingDatePicker = ({ date, setDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(date);
  const now = dayjs();

  return (
    <DatePicker
      format="YYYY-MM-DD_HH"
      showTime={{ defaultValue: dayjs('00:00:00', 'HH') }}
      value={date}
      onChange={(next) => setDate(next as dayjs.Dayjs)}
      onSelect={setSelectedDate}
      disabledDate={(current: dayjs.Dayjs) => {
        return current && current < now.startOf('day');
      }}
      disabledHours={() => {
        const selectedDateIsToday = selectedDate.format('YYYY-MM-DD') === now.format('YYYY-MM-DD');
        if (selectedDateIsToday) {
          return range(0, now.get('hour'));
        }
        return [];
      }}
      allowClear={false}
      showNow={false}
    />
  );
};

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export default BookingDatePicker;
