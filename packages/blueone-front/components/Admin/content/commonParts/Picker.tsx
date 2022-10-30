import generatePicker from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { css } from '@emotion/react';
import 'antd/lib/date-picker/style/index';

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export const { RangePicker } = DatePicker;

export const rangePickerNextMonthSectionHideStyles = css`
  .ant-picker {
    &-panels > *:first-of-type button.ant-picker-header-next-btn {
      visibility: visible !important;
    }

    &-panels > *:first-of-type button.ant-picker-header-super-next-btn {
      visibility: visible !important;
    }

    &-panels > *:last-of-type {
      display: none;
    }

    &-panel-container,
    &-footer {
      width: 280px !important;
    }

    &-footer-extra > div {
      flex-wrap: wrap !important;
    }
  }
`;
