import { DatePicker } from '@components/Admin/content/commonParts/Picker';
import dayjs from '@utils/dayjs';

type Props = {
  date: dayjs.Dayjs;
  setDate: (data: dayjs.Dayjs) => void;
};

const BookingDatePicker = ({ date, setDate }: Props) => {
  return (
    <DatePicker
      format="YYYY-MM-DD T HH"
      showTime={{ defaultValue: dayjs('00:00:00', 'HH') }}
      value={date}
      onChange={(next) => setDate(next as dayjs.Dayjs)}
      disabledDate={(current: dayjs.Dayjs) => {
        return current && current < dayjs().startOf('day');
      }}
      allowClear={false}
    />
  );
};

export default BookingDatePicker;
