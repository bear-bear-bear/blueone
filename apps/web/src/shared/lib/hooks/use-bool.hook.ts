import { useCallback, useState } from 'react';

/**
 * bool state를 선언적으로 관리하기 위한 훅
 */
export function useBool(initialValue = false, onToggle?: (value: boolean) => void) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  }, [onToggle]);

  return [value, toggle, setValue] as const;
}
