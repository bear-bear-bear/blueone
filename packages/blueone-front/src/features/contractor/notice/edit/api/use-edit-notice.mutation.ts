import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/notices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useEditNotice() {
  const queryClient = useQueryClient();

  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: NoticesService.edit,
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
