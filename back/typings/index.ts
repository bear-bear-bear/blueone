import type { Request } from 'express';
import type { User, UserInfo, Work, Notice } from '@/models';
import * as core from 'express-serve-static-core';

export type QueryTypedRequest<QT = core.Query> = Request<
  core.ParamsDictionary,
  unknown,
  unknown,
  QT,
  Record<string, unknown>
>;

export type ISODateString = string;
export type DatePickQuery = {
  start: ISODateString;
  end: ISODateString;
};

export type PaginationQuery = {
  per_page: string;
  page: string;
};

export type CreateUserRequestBody = Pick<User, 'phoneNumber'> &
  Pick<
    UserInfo,
    | 'realname'
    | 'dateOfBirth'
    | 'licenseNumber'
    | 'licenseType'
    | 'insuranceNumber'
    | 'insuranceExpirationDate'
  >;
export type UpdateUserRequestBody = CreateUserRequestBody;

export type WorkState = 'init' | 'checked' | 'done';
export type CreateWorkRequestBody = { UserId?: User['id'] } & Pick<
  Work,
  | 'origin'
  | 'waypoint'
  | 'destination'
  | 'carModel'
  | 'charge'
  | 'subsidy'
  | 'remark'
  | 'bookingDate'
>;
export type UpdateWorkRequestBody = CreateWorkRequestBody;

export type CreateNoticeRequestBody = Pick<
  Notice,
  'title' | 'content' | 'startDate' | 'endDate'
>;
export type UpdateNoticeRequestBody = CreateNoticeRequestBody;
