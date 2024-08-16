import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { ChangeStatusRequest, ChangeStatusResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCompleteWork() {
  const queryClient = useQueryClient();

  return useMutation<ChangeStatusResponse, AxiosError<APIError>, Omit<ChangeStatusRequest, 'state'>>({
    mutationFn: (request) => WorksService.changeStatus({ ...request, state: 'done' }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MyWorks],
      });
    },
  });
}
