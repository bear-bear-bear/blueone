import { AxiosError } from 'axios';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/notices';
import { useMutation } from '@tanstack/react-query';

export default function useEditNotice() {
  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: NoticesService.edit,
  });
}
