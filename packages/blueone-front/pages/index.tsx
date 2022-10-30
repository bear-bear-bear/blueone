import type { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '@components/Admin/Layout';
import useAdmin from '@hooks/useAdmin';

const Home: NextPage = () => {
  const { isAdminLoggedIn } = useAdmin({
    redirectTo: '/login',
  });

  if (!isAdminLoggedIn) return null;
  return (
    <>
      <Head>
        <title>BLUEONE | Admin</title>
      </Head>
      <AdminLayout />
    </>
  );
};

export default Home;
