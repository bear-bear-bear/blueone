import { useState } from 'react';
import dayjs from '@/shared/lib/utils/dayjs';

export default function useBookingDate(initialDate?: dayjs.Dayjs | string) {
  const [state, setState] = useState<dayjs.Dayjs>(() => {
    return init(initialDate);
  });

  const reset = () => {
    setState(init(initialDate));
  };

  return [state, setState, reset] as const;
}

function init(initialDate?: dayjs.Dayjs | string) {
  if (!initialDate) return dayjs().add(1, 'hour');

  if (typeof initialDate === 'string') return dayjs(initialDate);

  return initialDate;
}
