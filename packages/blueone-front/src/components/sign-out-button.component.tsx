import { App, Button, ButtonProps } from 'antd';
import { useRouter } from 'next/navigation';
import httpClient from '@/shared/api/axios';
import { LogoutOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';

type Props = ButtonProps & {
  kind?: 'icon' | 'text';
};

export default function SignOutButton({ kind = 'icon', ...rest }: Props) {
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
    return <Button type="text" title="로그아웃" icon={<LogoutOutlined size={22} />} onClick={handleClick} {...rest} />;
  }
  return (
    <Button type="text" onClick={handleClick} {...rest}>
      로그아웃
    </Button>
  );
}
