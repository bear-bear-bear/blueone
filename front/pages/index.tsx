import type { NextPage } from 'next';
import useUser from '@hooks/useUser';

const Home: NextPage = () => {
  const { isLoggedIn } = useUser({
    redirectTo: '/login',
  });

  if (!isLoggedIn) return null;
  return <div>서비스페이지</div>;
};

export default Home;
