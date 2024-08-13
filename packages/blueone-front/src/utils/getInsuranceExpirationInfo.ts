import relativeTime from 'dayjs/plugin/relativeTime';
import useUser from '@/hooks/useUser';
import dayjs from '@/utils/dayjs';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export type InsuranceExpirationInfo =
  | {
      state: 'safe' | 'warning' | 'danger';
      from: string;
      to: string;
    }
  | {
      state: undefined;
      from: undefined;
      to: undefined;
    };

export default function getInsuranceExpirationInfo(user: ReturnType<typeof useUser>['user']): InsuranceExpirationInfo {
  if (!user || !user?.UserInfo) {
    return {
      state: undefined,
      from: undefined,
      to: undefined,
    };
  }

  const { insuranceExpirationDate: expirationDate } = user.UserInfo;
  const now = dayjs();
  const DAY = 24 * 60 * 60 * 1000;

  const isValid = now.isBefore(expirationDate, 'day');
  const isImminent = !isValid ? false : dayjs(expirationDate).diff(now, 'ms') < 7 * DAY;

  return {
    state: isValid ? (!isImminent ? 'safe' : 'warning') : 'danger',
    from: now.from(expirationDate),
    to: now.to(expirationDate),
  };
}
