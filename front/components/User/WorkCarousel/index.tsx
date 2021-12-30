import { useCallback, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Card, Carousel, Empty, message } from 'antd';
import { Global } from '@emotion/react';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { Settings } from '@ant-design/react-slick';
import WorkCard from './WorkCard';
import * as S from './styles';
import 'antd/dist/antd.dark.css';

export type MyWorks = EndPoint['GET /user/works']['responses']['200'];

const EmptyWork = () => (
  <S.StyledEmpty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    imageStyle={{
      height: 60,
    }}
    description="아직 배정된 업무가 없어요 :)"
  />
);

const WorkCarousel = () => {
  const { data: myWorks } = useSWR<MyWorks>('/user/works', axiosFetcher, {
    refreshInterval: 60 * 1000,
  });
  const prevWorkCount = useRef<number | undefined>(myWorks?.length);
  const initialSlide = Number(localStorage.getItem('currSlide'));

  const afterChange: Settings['afterChange'] = useCallback((currSlide) => {
    localStorage.setItem('currSlide', currSlide.toString());
  }, []);

  useEffect(() => {
    if (!prevWorkCount.current) return;

    const currWorkCount = myWorks?.length ?? 0;
    if (currWorkCount > prevWorkCount.current) {
      message.info('새로운 업무가 추가됐어요!');
    }
    prevWorkCount.current = currWorkCount;
  }, [myWorks, prevWorkCount]);

  if (!myWorks) {
    return <Card loading />;
  }
  if (myWorks.length === 0) {
    return <EmptyWork />;
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
          <WorkCard work={work} />
        ))}
      </Carousel>
    </>
  );
};

export default WorkCarousel;
