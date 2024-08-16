import { SignOutResponse, UserClient } from '@/shared/api/types/user';
import { Singleton } from '@/shared/lib/decorators/singleton';
import HTTPClient from '../client/client';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetCompleteWorksRequest,
  GetCompleteWorksResponse,
  GetMyInfoResponse,
  GetWorksAnalysisRequest,
  GetWorksAnalysisResponse,
  GetWorksResponse,
  SignInRequest,
  SignInResponse,
} from '../types/user';

@Singleton
class UserService extends HTTPClient implements UserClient {
  private ROUTE = 'user';

  public getMyInfo = () => {
    return this.client.get<GetMyInfoResponse>(`${this.ROUTE}`);
  };

  public signIn = (request: SignInRequest) => {
    return this.client.post<SignInResponse>(`${this.ROUTE}/sign-in`, request);
  };

  public signOut = () => {
    return this.client.post<SignOutResponse>(`${this.ROUTE}/sign-out`);
  };

  public changePassword = (request: ChangePasswordRequest) => {
    return this.client.post<ChangePasswordResponse>(`${this.ROUTE}/password`, request);
  };

  public getWorks = () => {
    return this.client.get<GetWorksResponse>(`${this.ROUTE}/works`);
  };

  public getCompleteWorks = (request: GetCompleteWorksRequest) => {
    return this.client.get<GetCompleteWorksResponse>(`${this.ROUTE}/works/complete`, {
      params: request,
    });
  };

  public getWorksAnalysis = (request: GetWorksAnalysisRequest) => {
    return this.client.get<GetWorksAnalysisResponse>(`${this.ROUTE}/works/analysis`, {
      params: request,
    });
  };
}

const instance = new UserService();
export default instance;
