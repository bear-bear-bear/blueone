import { DateRange } from '@/shared/api/types';
import type dayjs from './dayjs';
import omit from './omit';

/**
 * For form values (date picker value)
 */
export type PackDateRange<T extends DateRange> = Omit<T, 'startDate' | 'endDate'> & {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
};

/**
 * For form values to api request payload
 */
export function unpackDateRange<T extends DateRange>(packed: PackDateRange<T>): T {
  // @ts-expect-error unpack done
  return {
    ...omit(packed, ['dateRange']),
    startDate: packed.dateRange[0].format('YYYY-MM-DD'),
    endDate: packed.dateRange[1].format('YYYY-MM-DD'),
  };
}
