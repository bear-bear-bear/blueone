import { useEffect, useRef } from 'react';
import { App } from 'antd';
import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetWorksResponse } from '@/shared/api/types/user';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useFetchWorks() {
  const query = useQuery<GetWorksResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.MyWorks],
    queryFn: UserService.getWorks,
    staleTime: 0,
    gcTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });

  useNotifyCompletedWorkOrderChange(query.data, query.isPending);

  return query;
}

function useNotifyCompletedWorkOrderChange(data: GetWorksResponse | undefined, isPending: boolean) {
  const prevDataRef = useRef(data);
  const { message } = App.useApp();

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (!prevDataRef.current || !data?.length || data.every((work) => !!work.endTime)) {
      prevDataRef.current = data;
      return;
    }

    const prevCompletedWorksCount = prevDataRef.current.filter((work) => !!work.endTime).length;
    const currentCompletedWorksCount = data.filter((work) => !!work.endTime).length;
    const maybeOccurredComplete = prevCompletedWorksCount < currentCompletedWorksCount;

    if (maybeOccurredComplete) {
      message.success('완료된 업무는 완료되지 않은 업무 뒤쪽으로 배치되었어요.');
    }

    prevDataRef.current = data;
  }, [data]);
}
