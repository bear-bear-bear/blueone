import { css } from '@emotion/react';
import 'antd/lib/date-picker/style/index';

// TODO: antd 5.x에서 잘 동작하는지 확인
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
