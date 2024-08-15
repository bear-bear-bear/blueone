import { App, Button, ButtonProps } from 'antd';
import { useRouter } from 'next/navigation';
import { CgLogOut } from 'react-icons/cg';
import httpClient from '@/shared/api/axios';
import { useQueryClient } from '@tanstack/react-query';

interface Props extends ButtonProps {
  kind?: 'icon' | 'text';
}

const SignOutButton = ({ kind = 'icon', ...rest }: Props) => {
  const { message } = App.useApp();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      await httpClient.post('/user/sign-out');
      queryClient.clear();
      router.push('/');
      message.success('로그아웃 완료');
    } catch (err) {
      throw err;
    }
  };

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
