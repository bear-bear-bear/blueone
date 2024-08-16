import { AxiosError } from 'axios';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/users';
import { useMutation } from '@tanstack/react-query';

export default function useEditSubcontractor() {
  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: UsersService.edit,
  });
}
