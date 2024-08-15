import { isAxiosError } from 'axios';

export default function isAuthError(error: unknown) {
  return isAxiosError(error) && (isAuthErrorStatus(error.status) || isAuthErrorStatus(error.response?.status));
}

function isAuthErrorStatus(status: number | undefined) {
  if (!status) return false;

  return [401, 403].includes(status);
}
