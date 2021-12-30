import type { NextPage } from 'next';
import useUser from '@hooks/useUser';
import { useEffect } from 'react';
import { Empty } from 'antd';
import UserLayout from '@components/User/Layout';
import 'antd/dist/antd.dark.css';

const TempEmpty = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    imageStyle={{
      height: 60,
    }}
    description="공지사항이 아직 작성되지 않았어요."
    style={{
      position: 'relative',
      top: '42%',
      transform: 'translateY(-50%)',
      color: '#fafafa',
      fontWeight: 300,
    }}
  />
);

const NoticePage: NextPage = () => {
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
      <TempEmpty />
    </UserLayout>
  );
};

export default NoticePage;
