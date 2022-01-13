import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { Alert } from 'antd';
import useSWR from 'swr';
import Marquee from 'react-fast-marquee';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';

type ActivatedNoticeList = EndPoint['GET /notice/activation']['responses']['200'];

const LatestNoticeAlert = () => {
  const { data: noticeList } = useSWR<ActivatedNoticeList>('/notice/activation', axiosFetcher);
  const router = useRouter();

  const onClickAlertBox: MouseEventHandler<HTMLDivElement> = () => {
    router.push('/worker/notice');
  };

  if (!noticeList || noticeList.length === 0) return <div />;
  const latestNotice = noticeList[0];
  return (
    <div style={{ position: 'absolute', left: 0, width: '100%', padding: '0 1rem', cursor: 'pointer' }}>
      <Alert
        banner
        type="info"
        message={
          <Marquee delay={5} gradient={false} style={{ color: '#FFF' }}>
            공지사항 - {latestNotice.title}
          </Marquee>
        }
        onClick={onClickAlertBox}
        style={{
          background: 'none',
          border: '1px solid #0076BB',
        }}
      />
    </div>
  );
};

export default LatestNoticeAlert;
