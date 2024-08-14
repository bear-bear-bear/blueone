import { Singleton } from '@/shared/lib/decorators/singleton';
import HTTPClient from '../client/client';
import {
  AddContractorRequest,
  AddContractorResponse,
  AddRequest,
  AddResponse,
  EditRequest,
  EditResponse,
  GetActivatedWorksRequest,
  GetActivatedWorksResponse,
  GetListResponse,
  GetRequest,
  GetResponse,
  RemoveRequest,
  RemoveResponse,
  UsersClient,
} from '../types/users';

@Singleton
class UsersService extends HTTPClient implements UsersClient {
  private ROUTE = 'users';

  public getList = () => {
    return this.client.get<GetListResponse>(`${this.ROUTE}`);
  };

  public add = (request: AddRequest) => {
    return this.client.post<AddResponse>(`${this.ROUTE}`, request);
  };

  public get = ({ userId }: GetRequest) => {
    return this.client.get<GetResponse>(`${this.ROUTE}/${userId}`);
  };

  public edit = ({ userId, ...request }: EditRequest) => {
    return this.client.put<EditResponse>(`${this.ROUTE}/${userId}`, request);
  };

  public remove = ({ userId }: RemoveRequest) => {
    return this.client.delete<RemoveResponse>(`${this.ROUTE}/${userId}`);
  };

  public getActivatedWorks = ({ userId }: GetActivatedWorksRequest) => {
    return this.client.get<GetActivatedWorksResponse>(`${this.ROUTE}/${userId}/works`);
  };

  public addContractor = (request: AddContractorRequest) => {
    return this.client.post<AddContractorResponse>(`${this.ROUTE}/contractor`, request);
  };
}

const instance = new UsersService();
export default instance;
