import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/notices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAddNotice() {
  const queryClient = useQueryClient();

  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: NoticesService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Notices],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ActiveNotices],
      });
    },
  });
}
