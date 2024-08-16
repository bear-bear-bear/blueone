import { AxiosError } from 'axios';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RemoveRequest, RemoveResponse } from '@/shared/api/types/users';
import { useMutation } from '@tanstack/react-query';

export default function useRemoveSubcontractor() {
  return useMutation<RemoveResponse, AxiosError<APIError>, RemoveRequest>({
    mutationFn: UsersService.remove,
  });
}
