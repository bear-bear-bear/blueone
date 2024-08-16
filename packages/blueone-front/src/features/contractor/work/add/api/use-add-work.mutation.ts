import { AxiosError } from 'axios';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { AddRequest, AddResponse } from '@/shared/api/types/works';
import { useMutation } from '@tanstack/react-query';

export default function useAddWork() {
  return useMutation<AddResponse, AxiosError<APIError>, AddRequest>({
    mutationFn: WorksService.add,
  });
}
