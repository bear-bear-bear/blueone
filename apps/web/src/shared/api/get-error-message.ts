import { isAxiosError } from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (typeof err === 'string') {
    return err;
  }
  if (isAxiosError(err)) {
    return err.response?.data?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Unknown error occurred';
};

export const getErrorMessageForUser = (err: unknown): string => {
  const SUFFIX = '사무실에 문의해주세요.';

  const errorMessage = (() => {
    if (!isAxiosError(err)) return '작업 수행 중 에러 발생';
    if (!err.response) return '요청이 수행되었으나 서버가 응답하지 않습니다.';
    if (err.response.status >= 500) return '작업 수행 중 서버 측 에러 발생';
    if (!err.response.data.message) return '작업 수행 중 정의되지 않은 에러 발생';
    return err.response.data.message as string;
  })();

  return `${errorMessage}, ${SUFFIX}`;
};
