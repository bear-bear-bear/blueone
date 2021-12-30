export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type ISODateString = string;

export type UserInfo = {
  id: number;
  UserId: number;
  realname: string;
  residentRegistrationNumber: string;
  licenseNumber: string;
  licenseType: string;
  insuranceNumber: string;
  insuranceExpirationDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type User = {
  id: number;
  role: 'user' | 'admin';
  phoneNumber: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
};

export type Work = {
  id: number;
  UserId: number | null;
  origin: string;
  waypoint: string | null;
  destination: string;
  carModel: string;
  charge: number;
  subsidy: number | null;
  remark: string | null;
  checkTime: ISODateString | null;
  endTime: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Notice = {
  id: number;
  UserId: number;
  title: string;
  content: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

// export type WorkState = 'checked' | 'done';
// export type UpdateWorkRequestBody = CreateWorkRequestBody;
//
// export type CreateNoticeRequestBody = Pick<Notice, 'title' | 'content'>;
// export type UpdateNoticeRequestBody = CreateNoticeRequestBody;

export interface ErrorMessage {
  message: string;
}
export interface EndPoint {
  /**
   * 내 정보 가져오기
   */
  'GET /user': {
    responses: {
      200: User & {
        UserInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
      };
      304: User & {
        UserInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
      };
      401: ErrorMessage;
      404: ErrorMessage;
    };
  };
  /**
   * 로그인
   */
  'POST /user/login': {
    requestBody: Pick<User, 'phoneNumber'> & {
      password: string;
    };
    responses: {
      200: User & {
        UserInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
      };
      409: ErrorMessage;
    };
  };
  /**
   * 로그아웃
   */
  'POST /user/logout': undefined;
  /**
   * 비밀번호 수정
   */
  'PATCH /user/password': undefined;
  /**
   * 활성화된 내 작업 리스트 가져오기
   */
  'GET /user/works': {
    responses: {
      200: Work[];
    };
  };

  /**
   * 유저 리스트 가져오기
   */
  'GET /users': {
    responses: {
      200: (User & {
        UserInfo: UserInfo;
        Work: Work;
      })[];
    };
  };
  /**
   * 유저 추가
   */
  'POST /users': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        | 'realname'
        | 'residentRegistrationNumber'
        | 'licenseType'
        | 'licenseNumber'
        | 'insuranceNumber'
        | 'insuranceExpirationDate'
      >;
    responses: {
      202: User & {
        UserInfo: UserInfo;
        Work: Work;
      };
      409: ErrorMessage;
    };
  };
  /**
   * 유저 가져오기
   */
  'GET /users/{userId}': {
    responses: {
      200: User & {
        UserInfo: UserInfo;
        Work: Work;
      };
      404: ErrorMessage;
    };
  };
  /**
   * 유저 수정
   */
  'PUT /users/{userId}': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        | 'realname'
        | 'residentRegistrationNumber'
        | 'licenseType'
        | 'licenseNumber'
        | 'insuranceNumber'
        | 'insuranceExpirationDate'
      >;
    responses: {
      200: User & {
        UserInfo: UserInfo;
        Work: Work;
      };
      404: ErrorMessage;
    };
  };
  /**
   * 유저 삭제
   */
  'DELETE /users/{userId}': {
    responses: {
      200: User;
      404: ErrorMessage;
    };
  };
  /**
   * 활성화된 유저 작업 가져오기
   */
  'GET /users/{userId}/works': {
    responses: {
      200: Work[];
    };
  };

  /**
   * 일주일 이내의 작업 리스트 가져오기
   */
  'GET /works': {
    responses: {
      200: (Work & {
        User?: User & {
          UserInfo: Pick<UserInfo, 'realname'>;
        };
      })[];
    };
  };
  /**
   * 작업 추가
   */
  'POST /works': {
    requestBody: Pick<
      Work,
      'UserId' | 'origin' | 'waypoint' | 'destination' | 'carModel' | 'charge' | 'subsidy' | 'remark'
    >;
    responses: {
      201: Work & {
        UserId: null;
      };
      400: ErrorMessage;
    };
  };
  /**
   * 작업 수정
   */
  'PUT /works/{workId}': {
    requestBody: Pick<
      Work,
      'UserId' | 'origin' | 'waypoint' | 'destination' | 'carModel' | 'charge' | 'subsidy' | 'remark'
    >;
    responses: {
      200: Work & {
        User?: User & {
          UserInfo: Pick<UserInfo, 'realname'>;
        };
      };
    };
  };
  /**
   * 작업 상태 수정
   */
  'PATCH /works/{workId}': {
    responses: {
      200: Work;
      403: ErrorMessage;
      404: ErrorMessage;
    };
  };
  /**
   * 작업 삭제
   */
  'DELETE /works/{workId}': {
    responses: {
      200: Work;
      404: ErrorMessage;
    };
  };

  /**
   * 공지사항 목록 가져오기
   */
  'GET /notice': undefined;
  /**
   * 공지사항 작성
   */
  'POST /notice': undefined;
  /**
   * 공지사항 가져오기
   */
  'GET /notice/{noticeId}': undefined;
  /**
   * 공지사항 수정
   */
  'PUT /notice/{noticeId}': undefined;
  /**
   * 공지사항 삭제
   */
  'DELETE /notice/{noticeId}': undefined;
}
