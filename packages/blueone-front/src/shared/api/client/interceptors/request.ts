import { InternalAxiosRequestConfig } from 'axios';
import { printRequestLog } from '@/shared/lib/utils/log/network-log';
import withDebugger from '@/shared/lib/utils/log/with-debugger';

const logger = withDebugger(0);

const requestLog = logger(printRequestLog);

export function logRequest(config: InternalAxiosRequestConfig) {
  requestLog({
    method: config.method,
    endPoint: config.url,
    requestParams: config.params,
    requestData: config.data,
  });

  return config;
}
