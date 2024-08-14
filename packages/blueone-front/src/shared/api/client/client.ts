import axios, { AxiosInstance } from 'axios';
import { flow } from '@/shared/lib/utils/flow';
import { logRequest } from './interceptors/request';
import { logError, logResponse, processError, unwrapResponse } from './interceptors/response';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://blueone.app' : 'http://localhost:8001',
  timeout: 15000,
  validateStatus: (status) => status >= 200 && status < 400,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(flow([logRequest]));
axiosInstance.interceptors.response.use(flow([logResponse, unwrapResponse]), flow([logError, processError]));

export default class HTTPClient {
  protected client = {
    get: <T>(...args: Parameters<AxiosInstance['get']>) => axiosInstance.get<T, T>(...args),
    post: <T>(...args: Parameters<AxiosInstance['post']>) => axiosInstance.post<T, T>(...args),
    put: <T>(...args: Parameters<AxiosInstance['put']>) => axiosInstance.put<T, T>(...args),
    patch: <T>(...args: Parameters<AxiosInstance['patch']>) => axiosInstance.patch<T, T>(...args),
    delete: <T>(...args: Parameters<AxiosInstance['delete']>) => axiosInstance.delete<T, T>(...args),
  };
}
