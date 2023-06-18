import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const globalCSS = css`
  tr {
    background: #fff !important;
  }

  .row--work-done {
    background: #ccc !important;
    transition: none;

    td {
      transition: background 0.1s !important;
    }
    &:hover td,
    &:focus td {
      background: #ccc !important;
    }

    .ant-table-cell-row-hover {
      background: #ccc !important;
    }
  }

  .ant-modal-body .ant-form-horizontal div:last-of-type {
    margin-bottom: 0;
  }

  .ant-picker-time-panel-cell-inner::after {
    content: ':00'; // 트릭 - BookingDatePicker 에서 picker panel 의 hour 에 :00 붙이고 싶은데 rc-picker 에서 패널 렌더 prop 을 제공하지 않음
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.66rem;
  margin-bottom: 0.66rem;

  section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.66rem;

    .ant-checkbox-wrapper {
      margin-left: 0;
    }
  }
`;

export const TotalFeeSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Remark = styled.p`
  padding: 0 16px;
  text-align: center;

  span {
    text-decoration: underline;
  }
`;
