import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { ONE_HOUR } from '@/shared/config/time';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query/src/types';
import * as Me from '../model/me.model';

export function useFetchMe(): UseQueryResult<Me.Model, AxiosError<APIError>> {
  return useQuery(queryOptions);
}

export function useSuspenseFetchMe(): UseSuspenseQueryResult<Me.Model, AxiosError<APIError>> {
  return useSuspenseQuery(queryOptions);
}

export const queryOptions: UseQueryOptions<Me.Model, AxiosError<APIError>> = {
  queryKey: [QueryKeys.Me],
  queryFn: UserService.getMyInfo,
  staleTime: ONE_HOUR,
  gcTime: ONE_HOUR,
  placeholderData: keepPreviousData,
};
