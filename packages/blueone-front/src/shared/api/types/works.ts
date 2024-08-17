import { EndPoint, Work } from '@/shared/api/types';

type WorkId = {
  workId: Work['id'];
};

export type GetListRequest = EndPoint['GET /works']['queryParams'];
export type GetListResponse = EndPoint['GET /works']['responses']['200'];

export type AddRequest = EndPoint['POST /works']['requestBody'];
export type AddResponse = EndPoint['POST /works']['responses']['201'];

export type EditRequest = WorkId & EndPoint['PUT /works/{workId}']['requestBody'];
export type EditResponse = EndPoint['PUT /works/{workId}']['responses']['200'];

export type ChangeStatusRequest = WorkId & EndPoint['PATCH /works/{workId}']['queryParams'];
export type ChangeStatusResponse = EndPoint['PATCH /works/{workId}']['responses']['200'];

export type ForceActivateRequest = WorkId;
export type ForceActivateResponse = EndPoint['PATCH /works/{workId}/force-activate']['responses']['200'];

export type ForceCompleteRequest = WorkId;
export type ForceCompleteResponse = EndPoint['PATCH /works/{workId}/force-complete']['responses']['200'];

export type RemoveRequest = WorkId;
export type RemoveResponse = EndPoint['DELETE /works/{workId}']['responses']['200'];

export interface WorksClient {
  getList: (request: GetListRequest) => Promise<GetListResponse>;
  add: (request: AddRequest) => Promise<AddResponse>;
  edit: (request: EditRequest) => Promise<EditResponse>;
  changeStatus: (request: ChangeStatusRequest) => Promise<ChangeStatusResponse>;
  forceActivate: (request: ForceActivateRequest) => Promise<ForceActivateResponse>;
  forceComplete: (request: ForceCompleteRequest) => Promise<ForceCompleteResponse>;
  remove: (request: RemoveRequest) => Promise<RemoveResponse>;
}
