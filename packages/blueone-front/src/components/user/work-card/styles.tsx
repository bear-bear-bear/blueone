import { Card } from 'antd';
import { AiOutlineFileDone } from 'react-icons/ai';
import theme from '@/global-styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CARD_MARGIN_TOP = '2rem';

const readOnlyCardStyles = css`
  border-top: 6px solid ${theme.primaryColor};
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  margin-top: 1em;

  .ant-card-body {
    padding: 1em;
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
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.66rem 0.33rem;
  margin-top: 24px;
  font-size: 16px;

  .label {
    text-align: right;
  }
  .content {
    font-size: inherit;
  }
`;

export const WorkDoneStamp = styled(AiOutlineFileDone)`
  color: #008000;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
