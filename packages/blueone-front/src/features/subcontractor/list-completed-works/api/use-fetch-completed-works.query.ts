import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetCompletedWorksRequest, GetCompletedWorksResponse } from '@/shared/api/types/user';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchCompletedWorks(request: GetCompletedWorksRequest) {
  return useQuery<GetCompletedWorksResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.MyCompletedWorks, request],
    queryFn: () => UserService.getCompletedWorks(request),
    staleTime: 0,
    gcTime: FIVE_MINUTES,
  });
}
