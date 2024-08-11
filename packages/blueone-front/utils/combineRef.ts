import type { LegacyRef, MutableRefObject, RefCallback } from 'react';

export function combineRef<T>(refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
