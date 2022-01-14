import useSWR from 'swr';
import { Card, List } from 'antd';
import { axiosFetcher } from '@utils/swr';
import EmptyContent from '@components/User/commonParts/Empty';
import type { EndPoint } from '@typings';
import * as S from './styles';

type ActivatedNoticeList = EndPoint['GET /notice/activation']['responses']['200'];

const NoticeList = () => {
  const { data: noticeList } = useSWR<ActivatedNoticeList>('/notice/activation', axiosFetcher, {
    revalidateOnFocus: false,
  });

  if (!noticeList) {
    return <Card loading />;
  }
  if (noticeList.length === 0) {
    return <EmptyContent description="공지사항이 아직 등록되지 않았어요." />;
  }
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={noticeList}
      renderItem={(item) => (
        <List.Item>
          <S.NoticeCard title={item.title}>
            <pre>{item.content}</pre>
          </S.NoticeCard>
        </List.Item>
      )}
    />
  );
};

export default NoticeList;
