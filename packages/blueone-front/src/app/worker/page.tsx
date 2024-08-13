'use client';
import { Button } from 'antd';
import Link from 'next/link';
import LatestNoticeAlert from '@/components/user/latest-notice-alert.component';
import NotificationBadge from '@/components/user/notification-badge.component';
import WorkCarousel from '@/components/user/work-carousel.component';
import useUser from '@/hooks/use-user.hook';
import getInsuranceExpirationInfo from '@/utils/get-insurance-expiration-info';

export default function WorkerHomePage() {
  const { user, isLoggedIn } = useUser({
    redirectTo: '/',
  });
  const insuranceDate = getInsuranceExpirationInfo(user);

  if (!isLoggedIn) return null;
  return (
    <>
      {insuranceDate.state === 'warning' && (
        <NotificationBadge
          type="warning"
          content={`보험 만료 ${insuranceDate.from} 입니다. 보험이 만료되면 업무 수행이 불가하니, 갱신 후 사무실로 알려주세요.`}
        />
      )}
      {insuranceDate.state === 'danger' && (
        <NotificationBadge
          type="error"
          content="보험이 만료되어 업무를 수행하실 수 없습니다. 보험 갱신 후 사무실로 알려주세요."
        />
      )}

      <LatestNoticeAlert />

      <WorkCarousel />

      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      >
        <Button type="text" style={{ color: '#fff', borderRadius: '2px' }}>
          <Link href="/worker/done-works">→ 완료된 업무 열람</Link>
        </Button>
      </div>
    </>
  );
}
