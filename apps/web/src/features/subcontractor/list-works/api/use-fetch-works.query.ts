import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetWorksResponse } from '@/shared/api/types/user';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchWorks() {
  return useQuery<GetWorksResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.MyWorks],
    queryFn: UserService.getWorks,
    staleTime: 0,
    gcTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}
