import type { NextPage } from 'next';
import useAdmin from '@hooks/useAdmin';
import AdminLayout from '@components/Admin/Layout';

const Home: NextPage = () => {
  const { isAdminLoggedIn } = useAdmin({
    redirectTo: '/login',
  });

  if (!isAdminLoggedIn) return null;
  return <AdminLayout />;
};

export default Home;
