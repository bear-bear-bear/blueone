import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RemoveRequest, RemoveResponse } from '@/shared/api/types/notices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRemoveNotice() {
  const queryClient = useQueryClient();

  return useMutation<RemoveResponse, AxiosError<APIError>, RemoveRequest>({
    mutationFn: NoticesService.remove,
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
