import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser, { Props } from '@/hooks/use-user.hook';

export default function useContractor({ redirectTo, redirectIfFound = false }: Props = {}) {
  const router = useRouter();
  const { user, mutateUser, isLoggedIn } = useUser({ redirectTo, redirectIfFound });
  const isContractor = user?.role === 'contractor';

  useEffect(() => {
    if (!redirectTo || !isLoggedIn) return; // !isLoggedIn 케이스의 라우팅은 useUser 훅스에서 처리함

    if (!isContractor) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, isContractor, redirectTo, router]);

  return { user, mutateUser, isContractorLoggedIn: isLoggedIn && isContractor };
}
