import { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from '@/shared/api/get-error-message';
import { isPlainObject } from '@/shared/lib/utils/is-plain-object';
import { printErrorLog, printResponseLog } from '@/shared/lib/utils/log/network-log';
import withDebugger from '@/shared/lib/utils/log/with-debugger';

const logger = withDebugger(0);
const verboseLogger = withDebugger(1);

const responseLog = verboseLogger(printResponseLog);
const errorLog = logger(printErrorLog);

export function logResponse(response: AxiosResponse) {
  const { config, data } = response;

  responseLog({
    method: config?.method,
    endPoint: config?.url,
    response: data?.data ?? data,
  });

  return response;
}

export function unwrapResponse(response: AxiosResponse) {
  return response.data?.data ?? response.data;
}

export function logError(e: AxiosError) {
  errorLog({
    method: e.config?.method,
    endPoint: e.config?.url,
    errorMessage: getErrorMessage(e),
    error: e,
  });

  return Promise.reject(e);
}

export function processError(e: AxiosError<unknown>) {
  if (!e.response) {
    return Promise.reject(e);
  }

  if (isPlainObject(e.response.data) && 'data' in e.response.data) {
    e.response.data = e.response.data.data; // unwrap
  }

  return Promise.reject(e);
}
