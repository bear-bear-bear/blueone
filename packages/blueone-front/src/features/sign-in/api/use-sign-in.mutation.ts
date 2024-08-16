import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { SignInRequest, SignInResponse } from '@/shared/api/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation<SignInResponse, AxiosError<APIError>, SignInRequest>({
    mutationFn: UserService.signIn,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: [QueryKeys.Me] }, data);
    },
  });
}
