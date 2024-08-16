import { AxiosError } from 'axios';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RemoveRequest, RemoveResponse } from '@/shared/api/types/notices';
import { useMutation } from '@tanstack/react-query';

export default function useRemoveNotice() {
  return useMutation<RemoveResponse, AxiosError<APIError>, RemoveRequest>({
    mutationFn: NoticesService.remove,
  });
}
