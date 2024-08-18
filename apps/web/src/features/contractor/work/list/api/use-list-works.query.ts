import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { WorksService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetListRequest, GetListResponse } from '@/shared/api/types/works';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchWorks(request: GetListRequest) {
  return useQuery<GetListResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.Works, request],
    queryFn: () => WorksService.getList(request),
    staleTime: 0,
    gcTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}
