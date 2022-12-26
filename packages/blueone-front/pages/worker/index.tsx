import { useEffect } from 'react';
import { message } from 'antd';
import type { NextPage } from 'next';
import ToDoneWorkSearchButton from '@components/User/DoneWorkSearch/ToDoneWorkSearchButton';
import UserLayout from '@components/User/Layout';
import LatestNoticeAlert from '@components/User/Notice/LatestNoticeAlert';
import NotificationBadge from '@components/User/NotificationBadge';
import WorkCarousel from '@components/User/WorkCarousel';
import useUser from '@hooks/useUser';
import getInsuranceExpirationInfo from '@utils/getInsuranceExpirationInfo';

const WorkPage: NextPage = () => {
  const { user, isLoggedIn } = useUser({
    redirectTo: '/login',
  });
  const insuranceDate = getInsuranceExpirationInfo(user);

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
        <NotificationBadge
          type="warn"
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
        <ToDoneWorkSearchButton />
      </div>
    </UserLayout>
  );
};

export default WorkPage;
