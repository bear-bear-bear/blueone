import { useState } from 'react';
import dayjs from '@utils/dayjs';

export function useBookingDate(initialDate?: dayjs.Dayjs | string | null) {
  return useState<dayjs.Dayjs>(
    (() => {
      if (!initialDate) return dayjs().add(1, 'hour');

      if (typeof initialDate === 'string') return dayjs(initialDate);

      return initialDate;
    })(),
  );
}
