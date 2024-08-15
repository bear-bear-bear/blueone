import type dayjs from '@/shared/lib/utils/dayjs';

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type ISODateString = string;

export type DateRange = {
  startDate: ISODateString;
  endDate: ISODateString;
};

/**
 * for form values (date picker value)
 */
export type PackDateRange<T extends DateRange> = Omit<T, 'startDate' | 'endDate'> & {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
};

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
  role: 'contractor' | 'subcontractor';
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

export interface APIError {
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
      401: APIError;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 로그인
   */
  'POST /user/sign-in': {
    requestBody: Pick<User, 'phoneNumber'> & {
      password: string;
    };
    responses: {
      200: User & {
        UserInfo: Pick<UserInfo, 'realname' | 'licenseType' | 'insuranceExpirationDate'>;
      };
      409: APIError;
      500: APIError;
    };
  };
  /**
   * 로그아웃
   */
  'POST /user/sign-out': {
    responses: {
      204: void;
      500: APIError;
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
      500: APIError;
    };
  };
  /**
   * 3일 이내의 내 업무 리스트 가져오기 (완료 날짜가 오늘인 항목을 제외하곤 완료된 업무 미포함)
   */
  'GET /user/works': {
    responses: {
      200: Work[];
      500: APIError;
    };
  };
  /**
   * 지정한 기간 내 완료된 내 업무 목록 가져오기
   */
  'GET /user/works/complete': {
    queryParams: DateRange;
    responses: {
      200: Work[];
      500: APIError;
    };
  };
  /**
   * 올해 혹은 이번달 내 업무의 최종지수 통계 가져오기
   */
  'GET /user/works/analysis': {
    queryParams: {
      by: 'day' | 'month';
    };
    responses: {
      200: { [dayOrMonth: `${number}`]: number };
      500: APIError;
    };
  };

  /**
   * Subcontractor 리스트 가져오기
   */
  'GET /users': {
    responses: {
      200: (User & {
        UserInfo: UserInfo;
      })[];
      500: APIError;
    };
  };
  /**
   * Subcontractor 등록
   */
  'POST /users': {
    requestBody: Pick<User, 'phoneNumber'> &
      Pick<
        UserInfo,
        'realname' | 'dateOfBirth' | 'licenseType' | 'licenseNumber' | 'insuranceNumber' | 'insuranceExpirationDate'
      >;
    responses: {
      201: User & {
        UserInfo: UserInfo;
      };
      409: APIError;
      500: APIError;
    };
  };
  /**
   * 특정 유저 가져오기
   */
  'GET /users/{userId}': {
    responses: {
      200: User & {
        UserInfo: UserInfo;
      };
      404: APIError;
      500: APIError;
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
      };
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 유저 삭제
   */
  'DELETE /users/{userId}': {
    responses: {
      200: User;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 활성화된 유저 업무 가져오기
   */
  'GET /users/{userId}/works': {
    responses: {
      200: Work[];
      500: APIError;
    };
  };
  /**
   * Contractor 생성
   */
  'POST /users/contractor': {
    requestBody: {
      phoneNumber: string;
      password: string;
      contractorCreateKey: string;
    };
    responses: {
      201: User;
      409: APIError;
      500: APIError;
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
      500: APIError;
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
      400: APIError;
      500: APIError;
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
      500: APIError;
    };
  };
  /**
   * 업무 상태 수정
   */
  'PATCH /works/{workId}': {
    queryParams: {
      state: 'init' | 'checked' | 'done';
    };
    responses: {
      200: Work;
      403: APIError;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 예약 업무 강제 활성화
   */
  'PATCH /works/{workId}/force-activate': {
    responses: {
      200: Work;
      403: APIError;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 업무 강제 완료
   */
  'PATCH /works/{workId}/force-finish': {
    responses: {
      200: Work;
      403: APIError;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 업무 삭제
   */
  'DELETE /works/{workId}': {
    responses: {
      200: Work;
      404: APIError;
      500: APIError;
    };
  };

  /**
   * 공지사항 목록 가져오기
   */
  'GET /notices': {
    queryParams: DateRange;
    responses: {
      200: Notice[];
      500: APIError;
    };
  };
  /**
   * 공지사항 작성
   */
  'POST /notices': {
    requestBody: {
      title: Notice['title'];
      content: Notice['content'];
      startDate: Notice['startDate'];
      endDate: Notice['endDate'];
    };
    responses: {
      201: Notice;
      500: APIError;
    };
  };
  /**
   * 공지사항 가져오기
   */
  'GET /notices/{noticeId}': {
    responses: {
      200: Notice;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 공지사항 수정
   */
  'PUT /notices/{noticeId}': {
    requestBody: {
      title: Notice['title'];
      content: Notice['content'];
      startDate: Notice['startDate'];
      endDate: Notice['endDate'];
    };
    responses: {
      200: Notice;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 공지사항 삭제
   */
  'DELETE /notices/{noticeId}': {
    responses: {
      200: Notice;
      404: APIError;
      500: APIError;
    };
  };
  /**
   * 활성화된 공지사항 목록 가져오기
   */
  'GET /notices/activation': {
    responses: {
      200: Notice[];
      500: APIError;
    };
  };
}
