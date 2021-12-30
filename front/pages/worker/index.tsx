import { useEffect } from 'react';
import type { NextPage } from 'next';
import useUser from '@hooks/useUser';
import UserLayout from '@components/User/Layout';
import WorkCarousel from '@components/User/WorkCarousel';
import 'antd/dist/antd.dark.css';

const WorkPage: NextPage = () => {
  const { user, isLoggedIn } = useUser({
    redirectTo: '/login',
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      alert('유저 전용 페이지입니다.');
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return null;
  return (
    <UserLayout>
      <WorkCarousel />
    </UserLayout>
  );
};

export default WorkPage;
