import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetListRequest, GetListResponse } from '@/shared/api/types/notices';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export function useFetchNotices(request: GetListRequest) {
  return useQuery<GetListResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.Notices, request],
    queryFn: () => NoticesService.getList(request),
    staleTime: 0,
    gcTime: FIVE_MINUTES,
  });
}
