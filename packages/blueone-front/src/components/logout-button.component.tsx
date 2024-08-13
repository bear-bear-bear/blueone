import { useCallback } from 'react';
import { App, Button, ButtonProps } from 'antd';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CgLogOut } from 'react-icons/cg';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint } from '@/typings';
import httpClient, { logAxiosError } from '@/utils/axios';
import { axiosFetcher } from '@/utils/swr';

interface Props extends ButtonProps {
  kind?: 'icon' | 'text';
}
type User = EndPoint['GET /user']['responses']['200'];
type LogoutError = EndPoint['POST /user/logout']['responses']['500'];

const LogoutButton = ({ kind = 'icon', ...rest }: Props) => {
  const { message } = App.useApp();
  const router = useRouter();
  const { mutate: mutateUser } = useSWRImmutable<User>('/user', axiosFetcher);

  const handleClick = useCallback(async () => {
    try {
      await httpClient.post('/user/logout');
      await mutateUser(undefined);
      await router.push('/');
      message.success('로그아웃 완료');
    } catch (err) {
      logAxiosError<LogoutError>(err as AxiosError<LogoutError>);
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

export default LogoutButton;
