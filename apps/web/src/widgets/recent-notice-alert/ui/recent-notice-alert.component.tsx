import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import { useFetchActiveNotices } from '@/features/subcontractor/list-active-notices';
import cn from '@/shared/lib/utils/cn';

type Props = {
  onClick?: () => void;
  className?: string;
};

export default function RecentNoticeAlert({ onClick, className }: Props) {
  const { data: notices } = useFetchActiveNotices();
  const recentNotice = notices?.[0];

  if (!recentNotice) return null;
  return (
    <div className={cn({ 'cursor-pointer': !!onClick }, className)}>
      <Alert
        banner
        type="info"
        onClick={onClick}
        message={
          <Marquee delay={5} gradient={false} className="text-white">
            공지사항&nbsp;-&nbsp;{recentNotice.title}
          </Marquee>
        }
      />
    </div>
  );
}
