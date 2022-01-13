import { EndPoint } from '@typings';
import useSWR from 'swr';
import { Card, List } from 'antd';
import { axiosFetcher } from '@utils/swr';
import EmptyContent from '@components/User/commonParts/Empty';

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
          <Card title={item.title}>{item.content}</Card>
        </List.Item>
      )}
    />
  );
};

export default NoticeList;
