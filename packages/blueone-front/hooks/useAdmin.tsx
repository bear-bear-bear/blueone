import { useEffect } from 'react';

import useUser, { Props } from '@hooks/useUser';
import { useRouter } from 'next/router';

export default function useAdmin({ redirectTo, redirectIfFound = false }: Props = {}) {
  const router = useRouter();
  const { user, mutateUser, isLoggedIn } = useUser({ redirectTo, redirectIfFound });
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!redirectTo || !isLoggedIn) return; // !isLoggedIn 케이스의 라우팅은 useUser 훅스에서 처리함

    if (!isAdmin) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, isAdmin, redirectTo, router]);

  return { user, mutateUser, isAdminLoggedIn: isLoggedIn && isAdmin };
}
