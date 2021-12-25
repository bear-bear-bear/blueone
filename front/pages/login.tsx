import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '@hooks/useUser';
import LoginForm from '@components/LoginForm';
import LoginLayout from '@components/LoginLayout';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      router.push('/');
    } else {
      router.push('/worker');
    }
  }, [isLoggedIn, router, user]);

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
