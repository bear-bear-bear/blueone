import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { ForceCompleteRequest, ForceCompleteResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useForceCompleteWork() {
  const queryClient = useQueryClient();

  return useMutation<ForceCompleteResponse, AxiosError<APIError>, ForceCompleteRequest>({
    mutationFn: WorksService.forceComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Works],
      });
    },
  });
}
