import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@components/Admin/content/commonParts/Picker';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

type Props = {
  defaultDate: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
};

const CustomDatePicker = ({ defaultDate, setDate }: Props) => {
  const handleChange: PickerProps<dayjs.Dayjs>['onChange'] = useCallback(
    (_, date) => {
      setDate(dayjs(date));
    },
    [setDate],
  );

  const disabledDate = useCallback((current: dayjs.Dayjs) => current && current < dayjs().endOf('day'), []);

  return (
    <DatePicker
      onChange={handleChange}
      defaultValue={dayjs(defaultDate)}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
};

export default CustomDatePicker;
