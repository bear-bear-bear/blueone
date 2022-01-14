import styled from '@emotion/styled';
import { Card } from 'antd';
import Linkify from 'linkify-react';

export const NoticeCard = styled(Card)`
  .ant-card-head {
    min-height: initial !important;
  }

  .ant-card-head-title {
    padding: 12px 0 !important;
  }

  .ant-card-body {
    padding: 12px !important;

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
