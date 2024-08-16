import { AxiosError } from 'axios';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { EditRequest, EditResponse } from '@/shared/api/types/works';
import { useMutation } from '@tanstack/react-query';

export default function useEditWork() {
  return useMutation<EditResponse, AxiosError<APIError>, EditRequest>({
    mutationFn: WorksService.edit,
  });
}
