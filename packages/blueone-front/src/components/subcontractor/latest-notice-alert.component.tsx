import type { MouseEventHandler } from 'react';
import { Alert } from 'antd';
import { useRouter } from 'next/navigation';
import Marquee from 'react-fast-marquee';
import useSWR from 'swr';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';

type ActivatedNoticeList = EndPoint['GET /notices/activation']['responses']['200'];

export default function LatestNoticeAlert() {
  const { data: noticeList } = useSWR<ActivatedNoticeList>('/notices/activation', axiosFetcher);
  const router = useRouter();

  const onClickAlertBox: MouseEventHandler<HTMLDivElement> = () => {
    router.push('/subcontractor/notices');
  };

  if (!noticeList || noticeList.length === 0) return <div />;
  const latestNotice = noticeList[0];
  return (
    <div className="absolute left-0 w-full px-4 cursor-pointer">
      <Alert
        banner
        type="info"
        onClick={onClickAlertBox}
        message={
          <Marquee delay={5} gradient={false} className="text-white">
            공지사항&nbsp;-&nbsp;{latestNotice.title}
          </Marquee>
        }
      />
    </div>
  );
}
