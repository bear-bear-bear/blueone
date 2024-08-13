import React, { useCallback, useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default function useInput(
  initialValue: string,
): [string, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<string>>] {
  const [input, setInput] = useState<string>(initialValue);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return [input, onChangeInput, setInput];
}
