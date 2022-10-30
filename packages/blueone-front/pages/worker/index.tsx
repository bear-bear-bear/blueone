import { useEffect } from 'react';

import ToDoneWorkSearchButton from '@components/User/DoneWorkSearch/ToDoneWorkSearchButton';
import UserLayout from '@components/User/Layout';
import LatestNoticeAlert from '@components/User/Notice/LatestNoticeAlert';
import NotificationBadge from '@components/User/NotificationBadge';
import WorkCarousel from '@components/User/WorkCarousel';
import useInsuranceExpiredInfo from '@hooks/useInsuranceExpiredInfo';
import useUser from '@hooks/useUser';
import { message } from 'antd';
import type { NextPage } from 'next';

const WorkPage: NextPage = () => {
  const { user, isLoggedIn } = useUser({
    redirectTo: '/login',
  });
  const insuranceDate = useInsuranceExpiredInfo(user);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      message.info('유저 전용 페이지입니다.');
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return null;
  return (
    <UserLayout>
      {insuranceDate.state === 'warn' && (
        <NotificationBadge type="warn" content={`보험 만료 ${insuranceDate.from} 입니다.`} />
      )}
      {insuranceDate.state === 'danger' && <NotificationBadge type="danger" content="보험이 만료되었습니다." />}
      <LatestNoticeAlert />
      <WorkCarousel />

      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      >
        <ToDoneWorkSearchButton />
      </div>
    </UserLayout>
  );
};

export default WorkPage;
