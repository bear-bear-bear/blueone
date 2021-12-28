import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const globalCSS = css`
  #workListTable tr td:first-of-type {
    vertical-align: baseline;
    padding: 12px 15px !important;

    button {
      position: relative;
      top: 2.5px;
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
