import { useCallback, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Card, Carousel, message } from 'antd';
import { Global } from '@emotion/react';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { Settings } from '@ant-design/react-slick';
import EmptyContent from '@components/User/commonParts/Empty';
import WorkCard from '../WorkCard';
import * as S from './styles';

export type MyWorks = EndPoint['GET /user/works']['responses']['200'];

const tempLocalStorage = {
  setItem() {
    return null;
  },
  getItem() {
    return '0';
  },
};

const WorkCarousel = () => {
  const { data: myWorks } = useSWR<MyWorks>('/user/works', axiosFetcher, {
    refreshInterval: 60 * 1000,
  });
  const prevWorkCount = useRef<number | undefined>(myWorks?.length);
  const localStorage = typeof window !== 'undefined' ? window.localStorage : tempLocalStorage;
  const initialSlide = Number(localStorage.getItem('currSlide'));

  const afterChange: Settings['afterChange'] = useCallback(
    (currSlide) => {
      localStorage.setItem('currSlide', currSlide.toString());
    },
    [localStorage],
  );

  useEffect(() => {
    if (!prevWorkCount.current) return;

    const currWorkCount = myWorks?.length ?? 0;
    if (currWorkCount > prevWorkCount.current) {
      message.info('새로운 업무가 등록됐어요!', 4);
    }
    prevWorkCount.current = currWorkCount;
  }, [myWorks, prevWorkCount]);

  if (!myWorks) {
    return <Card loading style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />;
  }
  if (myWorks.length === 0) {
    return <EmptyContent description="아직 배정된 업무가 없어요 :)" />;
  }
  return (
    <>
      <Global styles={S.globalCSS} />
      <Carousel
        dotPosition="top"
        infinite
        initialSlide={myWorks[initialSlide] ? initialSlide : 0}
        afterChange={afterChange}
      >
        {myWorks.map((work) => (
          <WorkCard work={work} key={work.id} />
        ))}
      </Carousel>
    </>
  );
};

export default WorkCarousel;
