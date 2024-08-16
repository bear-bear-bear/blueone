import { DateRange } from '@/shared/api/types';
import dayjs from './dayjs';
import omit from './omit';

/**
 * For form values (date picker value)
 */
export type PackDateRange<T extends DateRange> = Omit<T, 'startDate' | 'endDate'> & {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
};

export function packDateRange<T extends DateRange>(unpacked: T): PackDateRange<T> {
  return {
    ...omit(unpacked, ['startDate', 'endDate']),
    dateRange: [dayjs(unpacked.startDate), dayjs(unpacked.endDate)],
  };
}

/**
 * For form values to api request payload
 */
export function unpackDateRange<T extends DateRange, P extends PackDateRange<T>>(packed: P) {
  return {
    ...omit(packed, ['dateRange']),
    startDate: packed.dateRange[0].format('YYYY-MM-DD'),
    endDate: packed.dateRange[1].format('YYYY-MM-DD'),
  };
}
