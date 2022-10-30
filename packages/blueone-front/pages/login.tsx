import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import LoginForm from '@components/Login/Form';
import LoginLayout from '@components/Login/Layout';
import useInstallPWA from '@hooks/useInstallPWA';
import useUser from '@hooks/useUser';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const PWAButton = useInstallPWA();

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
      <PWAButton />
    </LoginLayout>
  );
};

export default LoginPage;
