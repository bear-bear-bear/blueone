import { useCallback } from 'react';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { DatePicker } from '@components/Admin/content/commonParts/Picker';
import dayjs from '@utils/dayjs';

type Props = {
  defaultDate?: dayjs.Dayjs;
  setDate?: (data: dayjs.Dayjs) => void;
  disabledDate?: PickerProps<dayjs.Dayjs>['disabledDate'];
};

const CustomDatePicker = ({ defaultDate, setDate, disabledDate }: Props) => {
  const handleChange: PickerProps<dayjs.Dayjs>['onChange'] = useCallback(
    (_, date) => {
      setDate?.(dayjs(date));
    },
    [setDate],
  );

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
