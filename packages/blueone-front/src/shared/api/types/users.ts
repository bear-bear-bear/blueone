import { EndPoint, User } from '@/shared/api/types';

type UserId = {
  userId: User['id'];
};

export type GetListResponse = EndPoint['GET /users']['responses']['200'];

export type AddRequest = EndPoint['POST /users']['requestBody'];
export type AddResponse = EndPoint['POST /users']['responses']['201'];

export type GetRequest = UserId;
export type GetResponse = EndPoint['GET /users/{userId}']['responses']['200'];

export type EditRequest = UserId & EndPoint['PUT /users/{userId}']['requestBody'];
export type EditResponse = EndPoint['PUT /users/{userId}']['responses']['200'];

export type RemoveRequest = UserId;
export type RemoveResponse = EndPoint['DELETE /users/{userId}']['responses']['200'];

export type GetActivatedWorksRequest = UserId;
export type GetActivatedWorksResponse = EndPoint['GET /users/{userId}/works']['responses']['200'];

export type RegisterContractorRequest = EndPoint['POST /users/contractor']['requestBody'];
export type RegisterContractorResponse = EndPoint['POST /users/contractor']['responses']['201'];

export interface UsersClient {
  getList: () => Promise<GetListResponse>;
  add: (request: AddRequest) => Promise<AddResponse>;
  get: (request: GetRequest) => Promise<GetResponse>;
  edit: (request: EditRequest) => Promise<EditResponse>;
  remove: (request: RemoveRequest) => Promise<RemoveResponse>;
  getActivatedWorks: (request: GetActivatedWorksRequest) => Promise<GetActivatedWorksResponse>;
  registerContractor: (request: RegisterContractorRequest) => Promise<RegisterContractorResponse>;
}
