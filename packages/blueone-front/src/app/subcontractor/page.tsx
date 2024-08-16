'use client';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NotificationBadge from '@/components/subcontractor/notification-badge.component';
import RecentNoticeAlert from '@/components/subcontractor/recent-notice-alert.component';
import { Me, useFetchMe } from '@/entities/me';

/**
 * NOTE: localStorage를 내부에서 사용하므로 dynamic import 사용
 */
const WorkCarousel = dynamic(() => import('@/components/subcontractor/work-carousel.component'), {
  ssr: false,
});

export default function SubcontractorHomePage() {
  const { data: me } = useFetchMe();
  const insuranceInfo = me && Me.insuranceInfo(me);

  return (
    <>
      {insuranceInfo && (
        <>
          {insuranceInfo.state === 'nearExpiration' && (
            <NotificationBadge
              type="warning"
              content={`보험 만료 ${insuranceInfo.from} 입니다. 보험이 만료되면 업무 수행이 불가하니, 갱신 후 사무실로 알려주세요.`}
            />
          )}
          {insuranceInfo.state === 'expired' && (
            <NotificationBadge
              type="error"
              content="보험이 만료되어 업무를 수행하실 수 없습니다. 보험 갱신 후 사무실로 알려주세요."
            />
          )}
        </>
      )}

      <RecentNoticeAlert />

      <WorkCarousel />

      <div className="absolute bottom-4 right-4">
        <Button type="text">
          <Link href="/subcontractor/completed-works">→ 완료된 업무 열람</Link>
        </Button>
      </div>
    </>
  );
}
