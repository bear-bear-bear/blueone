import { Singleton } from '@/shared/lib/decorators/singleton';
import HTTPClient from '../client/client';
import {
  AddRequest,
  AddResponse,
  ChangeStatusRequest,
  ChangeStatusResponse,
  EditRequest,
  EditResponse,
  ForceActivateRequest,
  ForceActivateResponse,
  ForceFinishRequest,
  ForceFinishResponse,
  GetListRequest,
  GetListResponse,
  RemoveRequest,
  RemoveResponse,
  WorksClient,
} from '../types/works';

@Singleton
class WorksService extends HTTPClient implements WorksClient {
  private ROUTE = 'works';

  public getList = (request: GetListRequest) => {
    return this.client.get<GetListResponse>(`${this.ROUTE}`, {
      params: request,
    });
  };

  public add = (request: AddRequest) => {
    return this.client.post<AddResponse>(`${this.ROUTE}`, request);
  };

  public edit = ({ workId, ...request }: EditRequest) => {
    return this.client.put<EditResponse>(`${this.ROUTE}/${workId}`, request);
  };

  public changeStatus = ({ workId, ...request }: ChangeStatusRequest) => {
    return this.client.patch<ChangeStatusResponse>(`${this.ROUTE}/${workId}`, undefined, {
      params: request,
    });
  };

  public forceActivate = ({ workId }: ForceActivateRequest) => {
    return this.client.patch<ForceActivateResponse>(`${this.ROUTE}/${workId}/force-activate`);
  };

  public forceFinish = ({ workId }: ForceFinishRequest) => {
    return this.client.patch<ForceFinishResponse>(`${this.ROUTE}/${workId}/force-finish`);
  };

  public remove = ({ workId }: RemoveRequest) => {
    return this.client.delete<RemoveResponse>(`${this.ROUTE}/${workId}`);
  };
}

const instance = new WorksService();
export default instance;
