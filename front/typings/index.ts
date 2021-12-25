export type UserInfo = {
  id: number;
  userId: number;
  realname: string;
  residentRegistrationNumber: string;
  licenseNumber: string;
  licenseType: string;
  insuranceNumber: string;
  insuranceExpirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  role: 'user' | 'admin';
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Work = {
  id: number;
  userId: number;
  origin: string;
  waypoint: string | null;
  destination: string;
  carModel: string;
  charge: number;
  subsidy: number | null;
  remark: string | null;
  checkTime: Date | null;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Notice = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

// export type WorkState = 'checked' | 'done';
// export type CreateWorkRequestBody = { userId?: User['id'] } & Pick<
//   Work,
//   | 'origin'
//   | 'waypoint'
//   | 'destination'
//   | 'carModel'
//   | 'charge'
//   | 'subsidy'
//   | 'remark'
// >;
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
        userInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
      };
      304: User & {
        userInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
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
        userInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
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
   * 유저 리스트 가져오기
   */
  'GET /users': undefined;
  /**
   * 유저 추가
   */
  'POST /users': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        | 'realname'
        | 'residentRegistrationNumber'
        | 'licenseNumber'
        | 'licenseType'
        | 'insuranceNumber'
        | 'insuranceExpirationDate'
      >;
    responses: {
      202: User & {
        userInfo: UserInfo;
      };
      409: ErrorMessage;
    };
  };
  /**
   * 유저 가져오기
   */
  'GET /users/{userId}': undefined;
  /**
   * 유저 수정
   */
  'PUT /users/{userId}': undefined;
  /**
   * 유저 삭제
   */
  'DELETE /users/{userId}': undefined;
  /**
   * 활성화된 유저 작업 가져오기
   */
  'GET /users/works': undefined;

  /**
   * 활성화된 작업 리스트 가져오기
   */
  'GET /works': undefined;
  /**
   * 작업 추가
   */
  'POST /works': undefined;
  /**
   * 작업 수정
   */
  'PUT /works/{workId}': undefined;
  /**
   * 작업 상태 수정
   */
  'PATCH /works/{workId}': undefined;
  /**
   * 작업 삭제
   */
  'DELETE /works/{workId}': undefined;

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
