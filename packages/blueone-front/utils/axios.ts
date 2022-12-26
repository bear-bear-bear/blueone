import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import type { ErrorMessage } from '@typings';

const MESSAGE_DURATION = 4;
export function logAxiosError<T extends ErrorMessage, D = unknown>(err: AxiosError<T, D>, forUser = false) {
  console.error(err);

  const suffix = forUser ? '사무실에 문의해주세요.' : '개발자에게 문의해주세요.';
  if (!err.isAxiosError) {
    message.error(`작업 수행 중 에러 발생, ${suffix}`, MESSAGE_DURATION);
    return;
  }
  if (!err.response) {
    message.error(`요청이 수행되었으나 서버가 응답하지 않습니다. ${suffix}`, MESSAGE_DURATION);
    return;
  }
  if (err.response.status >= 500) {
    message.error(`작업 수행 중 서버 측 에러 발생, ${suffix}`, MESSAGE_DURATION);
    return;
  }
  if (!err.response.data.message) {
    message.error(`작업 수행 중 정의되지 않은 에러 발생, ${suffix}`, MESSAGE_DURATION);
    return;
  }
  message.error(err.response.data.message, MESSAGE_DURATION);
}

const httpClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://blueone.app' : 'http://localhost:8001',
  withCredentials: true,
});

export default httpClient;
