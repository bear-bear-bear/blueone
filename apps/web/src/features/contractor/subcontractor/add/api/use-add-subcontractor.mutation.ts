import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAddSubcontractor() {
  const queryClient = useQueryClient();

  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: UsersService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Subcontractors],
      });
    },
  });
}
