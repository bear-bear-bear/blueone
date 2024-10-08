import { useState } from 'react';
import { App, ConfigProvider, DatePicker } from 'antd';
import dayjs from '@/shared/lib/utils/dayjs';
import './booking-date-picker.component.css';

type Props = {
  date: dayjs.Dayjs;
  setDate: (data: dayjs.Dayjs) => void;
};

export default function BookingDatePicker({ date, setDate }: Props) {
  const { message } = App.useApp();
  const [localDate, setLocalDate] = useState<dayjs.Dayjs>(date);
  const now = dayjs();

  const getFormat = (target: dayjs.Dayjs) => {
    return target.year() > now.year() ? 'YYYY-MM-DD HH:00' : 'MM-DD HH:00';
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            cellWidth: 32, // default 36. 모바일에서 팝업이 화면을 넘어가는걸 방지하기 위해 줄임. 줄였을 때 width 약 350px
          },
        },
      }}
    >
      <DatePicker
        format={getFormat(date)}
        showTime={{ defaultValue: dayjs('00:00:00', 'HH'), format: getFormat(localDate) }}
        value={date}
        onOk={(next) => {
          if (!next) {
            // block allow clear
            return;
          }
          if (+next.toDate() < +now.toDate()) {
            // block change by keyboard
            message.warning('현재 시간 이후로만 선택할 수 있습니다.');
            return;
          }
          setDate(next);
        }}
        onChange={setLocalDate}
        disabledDate={(current: dayjs.Dayjs) => {
          return current && current < now.startOf('day');
        }}
        disabledTime={(current) => ({
          disabledHours: () => {
            const selectedDateIsToday = current.format('YYYY-MM-DD') === now.format('YYYY-MM-DD');
            if (selectedDateIsToday) {
              return range(0, now.get('hour'));
            }
            return [];
          },
        })}
        allowClear={false}
        showNow={false}
      />
    </ConfigProvider>
  );
}

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
