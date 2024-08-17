import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { ForceActivateRequest, ForceActivateResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useForceActivateBookedWork() {
  const queryClient = useQueryClient();

  return useMutation<ForceActivateResponse, AxiosError<APIError>, ForceActivateRequest>({
    mutationFn: WorksService.forceActivate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Works],
      });
    },
  });
}
