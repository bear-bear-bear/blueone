import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { rangePickerNextMonthSectionHideStyles } from '@components/Admin/content/commonParts/RangePicker';

export const globalStyles = css`
  .notice-board__content-row {
    cursor: pointer;
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

export const ExpandContent = styled.p`
  text-align: center;
  margin: 0 auto;
  max-width: 400px;
  padding: 0 16px;
`;
