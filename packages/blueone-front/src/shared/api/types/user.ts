import { EndPoint } from '@/shared/api/types';

export type GetMyInfoResponse = EndPoint['GET /user']['responses']['200'];

export type SignInRequest = EndPoint['POST /user/sign-in']['requestBody'];
export type SignInResponse = EndPoint['POST /user/sign-in']['responses']['200'];

export type SignOutResponse = EndPoint['POST /user/sign-out']['responses']['204'];

export type ChangePasswordRequest = EndPoint['POST /user/password']['requestBody'];
export type ChangePasswordResponse = EndPoint['POST /user/password']['responses']['204'];

export type GetWorksResponse = EndPoint['GET /user/works']['responses']['200'];

export type GetCompletedWorksRequest = EndPoint['GET /user/works/complete']['queryParams'];
export type GetCompletedWorksResponse = EndPoint['GET /user/works/complete']['responses']['200'];

export type GetWorksAnalysisRequest = EndPoint['GET /user/works/analysis']['queryParams'];
export type GetWorksAnalysisResponse = EndPoint['GET /user/works/analysis']['responses']['200'];

export interface UserClient {
  signIn: (request: SignInRequest) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  getMyInfo: () => Promise<GetMyInfoResponse>;
  changePassword: (request: ChangePasswordRequest) => Promise<ChangePasswordResponse>;
  getWorks: () => Promise<GetWorksResponse>;
  getCompletedWorks: (params: GetCompletedWorksRequest) => Promise<GetCompletedWorksResponse>;
  getWorksAnalysis: (params: GetWorksAnalysisRequest) => Promise<GetWorksAnalysisResponse>;
}
