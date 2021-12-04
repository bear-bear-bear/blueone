import LoginForm from '@components/LoginForm';
import LoginLayout from '@components/LoginLayout';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => (
  <LoginLayout>
    <LoginForm />
  </LoginLayout>
);

export default LoginPage;
