'use client';
import { Card, List } from 'antd';
import Linkify from 'linkify-react';
import useSWR from 'swr';
import Empty from '@/components/subcontractor/empty.component';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';

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
        <List.Item className="border-t-2 border-solid border-primary rounded-t-none">
          <Card
            title={item.title}
            classNames={{
              header: '!p-3 !min-h-[unset]',
              body: '!py-3 !px-4',
            }}
          >
            <Linkify tagName="pre" className="whitespace-pre-wrap break-words font-[inherit]">
              {item.content}
            </Linkify>
          </Card>
        </List.Item>
      )}
    />
  );
}
