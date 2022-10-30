import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Linkify from 'linkify-react';

import { rangePickerNextMonthSectionHideStyles } from '@components/Admin/content/commonParts/Picker';

export const globalStyles = css`
  .ant-table-row {
    cursor: pointer;
  }

  .notice-board__non-padding-td {
    padding: 0 !important;
  }

  .notice-board__expanded-row {
    td {
      //background: #ddd !important;
    }
  }

  ${rangePickerNextMonthSectionHideStyles}
`;

export const Container = styled.div`
  max-width: 800px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.66rem;
  margin-bottom: 0.66rem;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const LinkifyPre = styled(Linkify)`
  padding: 0.66rem 1.33rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
`;
