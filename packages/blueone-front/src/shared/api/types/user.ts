import { EndPoint } from '@/shared/api/types';

export type GetMyInfoResponse = EndPoint['GET /user']['responses']['200'];

export type SignInRequest = EndPoint['POST /user/sign-in']['requestBody'];
export type SignInResponse = EndPoint['POST /user/sign-in']['responses']['200'];

export type ChangePasswordRequest = EndPoint['POST /user/password']['requestBody'];
export type ChangePasswordResponse = EndPoint['POST /user/password']['responses']['204'];

export type GetWorksResponse = EndPoint['GET /user/works']['responses']['200'];

export type GetCompleteWorksRequest = EndPoint['GET /user/works/complete']['queryParams'];
export type GetCompleteWorksResponse = EndPoint['GET /user/works/complete']['responses']['200'];

export type GetWorksAnalysisRequest = EndPoint['GET /user/works/analysis']['queryParams'];
export type GetWorksAnalysisResponse = EndPoint['GET /user/works/analysis']['responses']['200'];

export interface UserClient {
  getMyInfo: () => Promise<GetMyInfoResponse>;
  signIn: (request: SignInRequest) => Promise<SignInResponse>;
  changePassword: (request: ChangePasswordRequest) => Promise<ChangePasswordResponse>;
  getWorks: () => Promise<GetWorksResponse>;
  getCompleteWorks: (params: GetCompleteWorksRequest) => Promise<GetCompleteWorksResponse>;
  getWorksAnalysis: (params: GetWorksAnalysisRequest) => Promise<GetWorksAnalysisResponse>;
}
