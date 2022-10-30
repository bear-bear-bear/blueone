import { css } from '@emotion/react';
import styled from '@emotion/styled';

import media from '@utils/media';
import { Card } from 'antd';
import { AiOutlineFileDone } from 'react-icons/ai';

export const CARD_MARGIN_TOP = '2rem';

const readOnlyCardStyles = css`
  border-top: 7px solid #0076bb;
  margin-top: 1rem;

  .ant-card-body {
    padding: 14px 10px;

    ${media.sm} {
      padding: 14px;
    }
  }
`;
export const StyledCard = styled(Card)<{ readOnly: boolean }>`
  position: relative;
  max-height: 70vh;
  overflow-y: auto;
  margin-top: ${CARD_MARGIN_TOP};
  border: none;
  ${({ readOnly }) => readOnly && readOnlyCardStyles}
`;

export const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.66rem;
  margin-top: 1.33rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 0.66rem;
  font-size: 16px;

  p:first-of-type {
    width: fit-content;
    min-width: 4rem;
    text-align: right;
  }

  p:last-of-type {
    word-break: break-all;
  }
`;

export const WorkDoneStamp = styled(AiOutlineFileDone)`
  color: #008000;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
