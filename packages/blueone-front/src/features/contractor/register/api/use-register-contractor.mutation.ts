import { AxiosError } from 'axios';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { RegisterContractorRequest, RegisterContractorResponse } from '@/shared/api/types/users';
import { useMutation } from '@tanstack/react-query';

export default function useRegisterContractor() {
  return useMutation<RegisterContractorResponse, AxiosError<APIError>, RegisterContractorRequest>({
    mutationFn: UsersService.registerContractor,
  });
}
