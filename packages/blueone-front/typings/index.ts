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
  userId: number;
  realname: string;
  dateOfBirth: string;
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
  userId: number | null;
  origin: string;
  waypoint: string | null;
  destination: string;
  carModel: string;
  charge: number;
  adjustment: number | null;
  subsidy: number | null;
  payout: number;
  remark: string | null;
  checkTime: ISODateString | null;
  endTime: ISODateString | null;
  bookingDate: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Notice = {
  id: number;
  userId: number;
  title: string;
  content: string;
  startDate: ISODateString;
  endDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

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
      500: ErrorMessage;
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
      500: ErrorMessage;
    };
  };
  /**
   * 로그아웃
   */
  'POST /user/logout': {
    responses: {
      204: void;
      500: ErrorMessage;
    };
  };
  /**
   * 비밀번호 수정
   */
  'POST /user/password': {
    requestBody: {
      password: string;
    };
    responses: {
      204: void;
      500: ErrorMessage;
    };
  };
  /**
   * 3일 이내 내 작업 리스트 가져오기 (완료 날짜가 오늘인 항목을 제외하곤 완료된 작업 미포함)
   */
  'GET /user/works': {
    responses: {
      200: Work[];
      500: ErrorMessage;
    };
  };
  /**
   * 지정한 기간 내 완료된 내 작업 목록 가져오기
   */
  'GET /user/works/prev': {
    responses: {
      200: Work[];
      500: ErrorMessage;
    };
  };
  /**
   * 올해 혹은 이번달 내 업무의 최종지수 통계 가져오기
   */
  'GET /user/works/analysis': {
    responses: {
      200: { [dayOrMonth: `${number}`]: number };
      500: ErrorMessage;
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
      500: ErrorMessage;
    };
  };
  /**
   * 유저 등록
   */
  'POST /users': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        'realname' | 'dateOfBirth' | 'licenseType' | 'licenseNumber' | 'insuranceNumber' | 'insuranceExpirationDate'
      >;
    responses: {
      202: User & {
        UserInfo: UserInfo;
        Work: Work;
      };
      409: ErrorMessage;
      500: ErrorMessage;
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
      500: ErrorMessage;
    };
  };
  /**
   * 유저 수정
   */
  'PUT /users/{userId}': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        'realname' | 'dateOfBirth' | 'licenseType' | 'licenseNumber' | 'insuranceNumber' | 'insuranceExpirationDate'
      >;
    responses: {
      200: User & {
        UserInfo: UserInfo;
        Work: Work;
      };
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 유저 삭제
   */
  'DELETE /users/{userId}': {
    responses: {
      200: User;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 활성화된 유저 업무 가져오기
   */
  'GET /users/{userId}/works': {
    responses: {
      200: Work[];
      500: ErrorMessage;
    };
  };

  /**
   * 업무 목록 가져오기
   */
  'GET /works': {
    responses: {
      200: (Work & {
        User?: User & {
          UserInfo: Pick<UserInfo, 'realname'>;
        };
      })[];
      500: ErrorMessage;
    };
  };
  /**
   * 업무 등록
   */
  'POST /works': {
    requestBody: Omit<Work, 'id' | 'payout' | 'checkTime' | 'endTime' | 'createdAt' | 'updatedAt'>;
    responses: {
      201: Work & {
        userId: null;
      };
      400: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 업무 수정
   */
  'PUT /works/{workId}': {
    requestBody: Omit<Work, 'id' | 'payout' | 'checkTime' | 'endTime' | 'createdAt' | 'updatedAt'>;
    responses: {
      200: Work & {
        User?: User & {
          UserInfo: Pick<UserInfo, 'realname'>;
        };
      };
      500: ErrorMessage;
    };
  };
  /**
   * 업무 상태 수정
   */
  'PATCH /works/{workId}': {
    responses: {
      200: Work;
      403: ErrorMessage;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 업무 강제 완료
   */
  'PATCH /works/{workId}/force-finish': {
    responses: {
      200: Work;
      403: ErrorMessage;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 예약 업무 강제 활성화
   */
  'PATCH /works/{workId}/force-activate': {
    responses: {
      200: Work;
      403: ErrorMessage;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 업무 삭제
   */
  'DELETE /works/{workId}': {
    responses: {
      200: Work;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };

  /**
   * 공지사항 목록 가져오기
   */
  'GET /notice': {
    responses: {
      200: Notice[];
      500: ErrorMessage;
    };
  };
  /**
   * 공지사항 작성
   */
  'POST /notice': {
    requestBody: {
      title: Notice['title'];
      content: Notice['content'];
      startDate: Notice['startDate'];
      endDate: Notice['endDate'];
    };
    responses: {
      202: Notice;
      500: ErrorMessage;
    };
  };
  /**
   * 공지사항 가져오기
   */
  'GET /notice/{noticeId}': {
    responses: {
      200: Notice;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 공지사항 수정
   */
  'PUT /notice/{noticeId}': {
    requestBody: {
      title: Notice['title'];
      content: Notice['content'];
      startDate: Notice['startDate'];
      endDate: Notice['endDate'];
    };
    responses: {
      200: Notice;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 공지사항 삭제
   */
  'DELETE /notice/{noticeId}': {
    responses: {
      200: Notice;
      404: ErrorMessage;
      500: ErrorMessage;
    };
  };
  /**
   * 활성화된 공지사항 가져오기
   */
  'GET /notice/activation': {
    responses: {
      200: Notice[];
      500: ErrorMessage;
    };
  };
}
