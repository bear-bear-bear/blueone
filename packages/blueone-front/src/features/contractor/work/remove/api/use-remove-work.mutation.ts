import { AxiosError } from 'axios';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RemoveRequest, RemoveResponse } from '@/shared/api/types/works';
import { useMutation } from '@tanstack/react-query';

export default function useRemoveWork() {
  return useMutation<RemoveResponse, AxiosError<APIError>, RemoveRequest>({
    mutationFn: WorksService.remove,
  });
}
