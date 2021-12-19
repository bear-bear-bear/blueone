import { User, UserInfo } from '@/models';

export type CreateUserRequestBody = Pick<User, 'phoneNumber'> &
  Pick<
    UserInfo,
    | 'realname'
    | 'residentRegistrationNumber'
    | 'licenseNumber'
    | 'licenseType'
    | 'insuranceNumber'
    | 'insuranceExpirationDate'
  >;

export type UpdateUserRequestBody = CreateUserRequestBody;
