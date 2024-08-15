'use client';
import { useEffect, useRef } from 'react';
import { App, Card, Carousel } from 'antd';
import useSWR from 'swr';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import Empty from './empty.component';
import { WorkCard } from './work-card';
import './work-carousel.component.css';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];

export default function WorkCarousel() {
  const { message } = App.useApp();
  const { data: myWorks } = useSWR<MyWorks>('/user/works', axiosFetcher, {
    refreshInterval: 60 * 1000,
  });
  const prevWorkCount = useRef<number | undefined>(myWorks?.length);
  const initialSlide = Number(localStorage.getItem('currSlide'));

  const afterChange = (currSlide: number) => {
    localStorage.setItem('currSlide', currSlide.toString());
  };

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
    return <Empty description="아직 배정된 업무가 없어요 :)" />;
  }
  return (
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
  );
}
