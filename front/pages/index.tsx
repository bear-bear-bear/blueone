import type { NextPage } from 'next';
import useAdmin from '@hooks/useAdmin';

const Home: NextPage = () => {
  const { isAdminLoggedIn } = useAdmin({
    redirectTo: '/login',
  });

  if (!isAdminLoggedIn) return null;
  return <div>어드민 인덱스 페이지</div>;
};

export default Home;
