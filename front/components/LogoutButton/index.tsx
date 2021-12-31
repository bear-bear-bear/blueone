import { useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { Button, ButtonProps, message } from 'antd';
import { CgLogOut } from 'react-icons/cg';
import httpClient from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';

interface Props extends ButtonProps {
  kind?: 'icon' | 'text';
}
type LogoutResponse = EndPoint['POST /user/logout']['responses']['204'];
type User = EndPoint['GET /user']['responses']['200'];

const LogoutButton = ({ kind = 'icon', ...rest }: Props) => {
  const router = useRouter();
  const { mutate: mutateUser } = useSWRImmutable<User>('/user', axiosFetcher);

  const handleClick = useCallback(async () => {
    try {
      await httpClient.post<LogoutResponse>('/user/logout');
      await mutateUser(undefined);
      await router.push('/login');
      message.success('로그아웃 완료');
    } catch (err) {
      message.error('로그아웃 중 에러 발생, 개발자에게 문의하세요.');
      console.error(err);
    }
  }, []);

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
