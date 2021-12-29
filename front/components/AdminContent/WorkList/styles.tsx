import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const globalCSS = css`
  .row--work-done {
    background-color: #666;
    transition: none;

    td {
      transition: background-color 0.1s !important;
    }
    &:hover td,
    &:focus td {
      background-color: #777 !important;
    }
  }

  .ant-modal-body .ant-form-horizontal div:last-child {
    margin-bottom: 0;
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
