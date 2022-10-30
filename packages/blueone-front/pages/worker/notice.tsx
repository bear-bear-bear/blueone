import { useEffect } from 'react';
import { message } from 'antd';
import type { NextPage } from 'next';
import UserLayout from '@components/User/Layout';
import NoticeList from '@components/User/Notice/List';
import useUser from '@hooks/useUser';

const NoticePage: NextPage = () => {
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
    <UserLayout>
      <NoticeList />
    </UserLayout>
  );
};

export default NoticePage;
