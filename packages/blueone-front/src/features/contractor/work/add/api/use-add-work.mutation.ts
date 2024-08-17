import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/works';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAddWork() {
  const queryClient = useQueryClient();

  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: WorksService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Works],
      });
    },
  });
}
