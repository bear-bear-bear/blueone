import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useEditWork() {
  const queryClient = useQueryClient();

  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: WorksService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Works],
      });
    },
  });
}
