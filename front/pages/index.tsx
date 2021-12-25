import type { NextPage } from 'next';
import useUser from '@hooks/useUser';

const Home: NextPage = () => {
  const { user } = useUser({
    redirectTo: '/login',
  });

  if (!user) return null;
  return <div>서비스페이지</div>;
};

export default Home;
