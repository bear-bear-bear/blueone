import { AxiosError } from 'axios';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/notices';
import { useMutation } from '@tanstack/react-query';

export default function useAddNotice() {
  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: NoticesService.add,
  });
}
