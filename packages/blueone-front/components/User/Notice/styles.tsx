import { Card } from 'antd';
import Linkify from 'linkify-react';
import styled from '@emotion/styled';

export const NoticeCard = styled(Card)`
  .ant-card-head {
    padding: 12px !important;
    min-height: initial !important;
  }

  .ant-card-body {
    padding: 12px 16px !important;

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: inherit;
    }
  }
`;

export const LinkifyPre = styled(Linkify)`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
`;
