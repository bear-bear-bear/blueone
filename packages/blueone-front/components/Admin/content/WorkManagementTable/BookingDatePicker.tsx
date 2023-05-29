import { useState } from 'react';
import { message } from 'antd';
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
      onChange={(next) => {
        if (!next) {
          // block allow clear
          return;
        }
        if (+next.toDate() < +now.toDate()) {
          // block change by keyboard
          message.warn('현재 시간 이후로만 선택할 수 있습니다.');
          return;
        }
        setDate(next);
      }}
      onSelect={setSelectedDate}
      // block change by mouse
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
