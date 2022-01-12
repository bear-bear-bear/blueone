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
  }
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
