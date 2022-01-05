import { Dispatch, SetStateAction, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import 'antd/lib/date-picker/style/index';
import type { DateRange } from '@components/Admin/content/WorkTable/index';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
const { RangePicker } = DatePicker;

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const CustomDatePicker = ({ dateRange, setDateRange }: Props) => {
  const today = dayjs();

  const handleChange = useCallback(
    (_: unknown, [startDate, endDate]: [string, string]) => {
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
        Today: [today, today],
        'This Month': [today.startOf('month'), today.endOf('month')],
      }}
      onChange={handleChange}
      defaultValue={[dayjs(dateRange.start), dayjs(dateRange.end)]}
    />
  );
};

export default CustomDatePicker;
