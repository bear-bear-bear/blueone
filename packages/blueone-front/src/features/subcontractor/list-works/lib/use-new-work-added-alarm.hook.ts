import { useEffect, useRef } from 'react';
import { App } from 'antd';
import { Work } from '@/shared/api/types';

/**
 * 주의 - undefined일 때 ?? 등으로 [] 로 변환하여 넣는다면, 기능이 예상대로 동작하지 않습니다.
 */
export default function useNewWorkAddedAlarm(works: Work[] | undefined) {
  const { message } = App.useApp();
  const prevWorksCount = useRef(works?.length);

  useEffect(() => {
    if (!works) {
      return;
    }
    if (typeof prevWorksCount.current === 'undefined') {
      prevWorksCount.current = works.length;
      return;
    }

    const currWorkCount = works.length;
    if (currWorkCount > prevWorksCount.current) {
      message.info('새로운 업무가 등록됐어요!');
    }

    prevWorksCount.current = currWorkCount;
  }, [works?.length]);
}
