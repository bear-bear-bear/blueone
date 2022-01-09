import type { NextPage } from 'next';
import { useEffect } from 'react';
import { message } from 'antd';
import useUser from '@hooks/useUser';
import UserLayout from '@components/User/Layout';
import EmptyContent from '@components/User/parts/Empty';

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
      <EmptyContent description="공지사항이 아직 등록되지 않았어요." />
    </UserLayout>
  );
};

export default NoticePage;
