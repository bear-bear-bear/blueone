import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UsersService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetListResponse } from '@/shared/api/types/users';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export function useFetchSubcontractors() {
  return useQuery<GetListResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.Subcontractors],
    queryFn: UsersService.getList,
    staleTime: 0,
    gcTime: FIVE_MINUTES,
  });
}
