'use client';
import { useEffect, useRef } from 'react';
import { Card, Carousel, message } from 'antd';
import useSWR from 'swr';
import type { EndPoint } from '@typings';
import { css, Global } from '@emotion/react';
import media from '@utils/media';
import { axiosFetcher } from '@utils/swr';
import WorkCard from '../WorkCard';
import { CARD_MARGIN_TOP } from '../WorkCard/styles';
import EmptyContent from '../commonParts/Empty';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];

export default function WorkCarousel() {
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
    return <EmptyContent description="아직 배정된 업무가 없어요 :)" />;
  }
  return (
    <>
      <Global styles={globalCSS} />
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
}

const globalCSS = css`
  .ant-card-actions {
    li {
      margin: 0 !important;
    }
  }

  .ant-card-body {
    padding: 24px 12px;

    ${media.sm} {
      padding: 24px;
    }
  }

  .ant-carousel {
    position: relative;
    top: calc(50% - ${CARD_MARGIN_TOP});
    transform: translateY(-50%);

    .slick-slide > div {
      padding: 0 3px;
    }

    .carousel-custom-dot {
      li {
        button {
          background: #141414 !important;
        }
      }

      li.slick-active {
        button {
          background: #141414 !important;
        }
      }
    }
  }
`;
