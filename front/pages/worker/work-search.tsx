import type { NextPage } from 'next';
import { useEffect } from 'react';
import { message } from 'antd';
import useUser from '@hooks/useUser';
import UserLayout from '@components/User/Layout';
import WorkSearch from '@components/User/WorkSearch';

const WorkSearchPage: NextPage = () => {
  const { user, isLoggedIn } = useUser({
    redirectTo: '/login',
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      message.info('유저 전용 페이지입니다.');
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return null;
  return (
    <UserLayout useBack>
      <WorkSearch />
    </UserLayout>
  );
};

export default WorkSearchPage;
