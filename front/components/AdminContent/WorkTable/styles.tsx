import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const globalCSS = css`
  tr {
    background: #fff;
  }
  .row--work-done {
    background-color: #aaa;
    transition: none;

    td {
      transition: background-color 0.1s !important;
    }
    &:hover td,
    &:focus td {
      background-color: #ccc !important;
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
