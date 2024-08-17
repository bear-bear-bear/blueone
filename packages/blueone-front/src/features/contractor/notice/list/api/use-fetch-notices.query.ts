import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetListRequest, GetListResponse } from '@/shared/api/types/notices';
import { FIVE_MINUTES, ONE_MINUTE } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchNotices(request: GetListRequest) {
  return useQuery<GetListResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.Notices, request],
    queryFn: () => NoticesService.getList(request),
    staleTime: ONE_MINUTE,
    gcTime: FIVE_MINUTES,
  });
}
