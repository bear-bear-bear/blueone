import LoginForm from '@components/LoginForm';
import CenterLayout from '@components/CenterLayout';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <CenterLayout>
    <LoginForm />
  </CenterLayout>
);

export default Home;
