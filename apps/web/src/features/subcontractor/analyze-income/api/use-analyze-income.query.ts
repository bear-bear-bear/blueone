import { AxiosError } from 'axios';
import { QueryKeys } from '@/shared/api/query-keys';
import { UserService } from '@/shared/api/services';
import { APIError } from '@/shared/api/types';
import { GetWorksAnalysisRequest, GetWorksAnalysisResponse } from '@/shared/api/types/user';
import { FIVE_MINUTES } from '@/shared/config/time';
import { useQuery } from '@tanstack/react-query';

export default function useAnalyzeIncome(request: GetWorksAnalysisRequest) {
  return useQuery<GetWorksAnalysisResponse, AxiosError<APIError>>({
    queryKey: [QueryKeys.MyIncomeAnalysis, request.by],
    queryFn: () => UserService.getWorksAnalysis(request),
    staleTime: 0,
    gcTime: FIVE_MINUTES,
  });
}
