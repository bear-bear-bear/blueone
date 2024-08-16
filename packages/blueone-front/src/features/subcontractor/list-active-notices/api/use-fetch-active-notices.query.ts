import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { NoticesService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetActiveListResponse } from '@/shared/api/types/notices';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchActiveNotices() {
  return useQuery<GetActiveListResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.ActiveNotices],
    queryFn: NoticesService.getActiveList,
    staleTime: 0,
    gcTime: FIVE_MINUTES,
  });
}
