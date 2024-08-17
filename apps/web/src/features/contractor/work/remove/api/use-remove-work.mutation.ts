import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RemoveRequest, RemoveResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRemoveWork() {
  const queryClient = useQueryClient();

  return useMutation<RemoveResponse, AxiosError<APIError>, RemoveRequest>({
    mutationFn: WorksService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Works],
      });
    },
  });
}
