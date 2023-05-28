import generatePicker from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import 'antd/lib/date-picker/style/index';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
const { RangePicker } = DatePicker;

export default RangePicker;
