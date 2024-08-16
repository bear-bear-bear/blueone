import { AxiosError } from 'axios';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/users';
import { useMutation } from '@tanstack/react-query';

export default function useAddSubcontractor() {
  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: UsersService.add,
  });
}
