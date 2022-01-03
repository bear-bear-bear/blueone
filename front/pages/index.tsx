import type { NextPage } from 'next';
import useAdmin from '@hooks/useAdmin';
import AdminLayout from '@components/Admin/Layout';
import Head from 'next/head';

const Home: NextPage = () => {
  const { isAdminLoggedIn } = useAdmin({
    redirectTo: '/login',
  });

  if (!isAdminLoggedIn) return null;
  return (
    <>
      <Head>
        <title>Blueone | Admin</title>
      </Head>
      <AdminLayout />
    </>
  );
};

export default Home;
