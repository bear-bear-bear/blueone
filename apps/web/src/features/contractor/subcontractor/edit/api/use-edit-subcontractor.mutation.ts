import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useEditSubcontractor() {
  const queryClient = useQueryClient();

  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: UsersService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Subcontractors],
      });
    },
  });
}
