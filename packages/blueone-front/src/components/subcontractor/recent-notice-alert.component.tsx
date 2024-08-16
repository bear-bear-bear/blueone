import { Alert } from 'antd';
import { useRouter } from 'next/navigation';
import Marquee from 'react-fast-marquee';
import { useFetchActiveNotices } from '@/features/subcontractor/list-active-notices';

export default function RecentNoticeAlert() {
  const router = useRouter();
  const { data: notices } = useFetchActiveNotices();
  const recentNotice = notices?.[0];

  const onClickAlertBox = () => {
    router.push('/subcontractor/notices');
  };

  if (!recentNotice) return null;
  return (
    <div className="absolute left-0 w-full px-4 cursor-pointer">
      <Alert
        banner
        type="info"
        onClick={onClickAlertBox}
        message={
          <Marquee delay={5} gradient={false} className="text-white">
            공지사항&nbsp;-&nbsp;{recentNotice.title}
          </Marquee>
        }
      />
    </div>
  );
}
