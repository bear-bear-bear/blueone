import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DeleteOutlined } from '@ant-design/icons';

export const globalCSS = css`
  tr td:first-of-type {
    vertical-align: baseline;
    padding: 12px 15px !important;

    button {
      position: relative;
      top: 2.5px;
    }
  }
`;

export const DeleteIconOutlined = styled(DeleteOutlined)`
  transition: color 0.15s linear;

  :hover,
  :focus {
    color: #c40909;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
