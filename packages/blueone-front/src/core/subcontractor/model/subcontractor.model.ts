import { ONE_DAY } from '@/shared/config/time';
import dayjs from '@/shared/lib/utils/dayjs';

export type InsuranceState = 'normal' | 'nearExpiration' | 'expired';
export const insuranceInfo = (expirationDate: string) => {
  const now = dayjs();

  const state: InsuranceState = (() => {
    if (now.isAfter(expirationDate, 'day')) return 'expired';
    if (dayjs(expirationDate).diff(now, 'ms') < 7 * ONE_DAY) return 'nearExpiration';
    return 'normal';
  })();

  return {
    state,
    from: now.from(expirationDate),
    to: now.to(expirationDate),
  };
};
