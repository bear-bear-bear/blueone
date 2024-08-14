'use client';
import { Card, List } from 'antd';
import Linkify from 'linkify-react';
import useSWR from 'swr';
import Empty from '@/components/subcontractor/empty.component';
import theme from '@/global-styles/theme';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import styled from '@emotion/styled';

type ActivatedNoticeList = EndPoint['GET /notices/activation']['responses']['200'];

export default function NoticePage() {
  const { data: noticeList } = useSWR<ActivatedNoticeList>('/notices/activation', axiosFetcher, {
    revalidateOnFocus: false,
  });

  if (!noticeList) {
    return <Card loading />;
  }
  if (noticeList.length === 0) {
    return <Empty description="공지사항이 아직 등록되지 않았어요." />;
  }
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={noticeList}
      renderItem={(item) => (
        <List.Item style={{ borderTop: `4px solid ${theme.primaryColor}` }}>
          <NoticeCard title={item.title}>
            <LinkifyPre tagName="pre">{item.content}</LinkifyPre>
          </NoticeCard>
        </List.Item>
      )}
    />
  );
}

const NoticeCard = styled(Card)`
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

const LinkifyPre = styled(Linkify)`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
`;
