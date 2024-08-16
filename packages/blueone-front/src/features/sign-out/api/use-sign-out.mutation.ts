import { App } from 'antd';
import { AxiosError } from 'axios';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { SignOutResponse } from '@/shared/api/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSignOut() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation<SignOutResponse, AxiosError<APIError>>({
    mutationFn: UserService.signOut,
    onSuccess: () => {
      queryClient.clear();
      location.href = '/';
      message.success('로그아웃 완료');
    },
  });
}
