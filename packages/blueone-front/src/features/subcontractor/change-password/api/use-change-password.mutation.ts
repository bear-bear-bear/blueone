import { AxiosError } from 'axios';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { ChangePasswordRequest, ChangePasswordResponse } from '@/shared/api/types/user';
import { useMutation } from '@tanstack/react-query';

export default function useChangePassword() {
  return useMutation<ChangePasswordResponse, AxiosError<APIError>, ChangePasswordRequest>({
    mutationFn: UserService.changePassword,
  });
}
