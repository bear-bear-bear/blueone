import generatePicker from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import 'antd/lib/date-picker/style/index';

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export const { RangePicker } = DatePicker;
