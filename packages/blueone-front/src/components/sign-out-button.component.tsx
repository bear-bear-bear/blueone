import { useCallback } from 'react';
import { App, Button, ButtonProps } from 'antd';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CgLogOut } from 'react-icons/cg';
import useSWRImmutable from 'swr/immutable';
import httpClient, { logAxiosError } from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';

interface Props extends ButtonProps {
  kind?: 'icon' | 'text';
}
type User = EndPoint['GET /user']['responses']['200'];
type SignOutError = EndPoint['POST /user/sign-out']['responses']['500'];

const SignOutButton = ({ kind = 'icon', ...rest }: Props) => {
  const { message } = App.useApp();
  const router = useRouter();
  const { mutate: mutateUser } = useSWRImmutable<User>('/user', axiosFetcher);

  const handleClick = useCallback(async () => {
    try {
      await httpClient.post('/user/sign-out');
      await mutateUser(undefined);
      await router.push('/');
      message.success('로그아웃 완료');
    } catch (err) {
      logAxiosError<SignOutError>(err as AxiosError<SignOutError>);
    }
  }, [mutateUser, router]);

  if (kind === 'icon') {
    return <Button type="text" title="로그아웃" icon={<CgLogOut size={22} />} onClick={handleClick} {...rest} />;
  }
  return (
    <Button type="text" onClick={handleClick} {...rest}>
      로그아웃
    </Button>
  );
};

export default SignOutButton;
