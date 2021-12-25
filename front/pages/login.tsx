import type { NextPage } from 'next';
import useUser from '@hooks/useUser';
import LoginForm from '@components/LoginForm';
import LoginLayout from '@components/LoginLayout';

const LoginPage: NextPage = () => {
  useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
