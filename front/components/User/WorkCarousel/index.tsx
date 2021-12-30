import useSWR from 'swr';
import { Card, Carousel, Empty } from 'antd';
import { Global } from '@emotion/react';
import { axiosFetcher } from '@utils/swr';
import { EndPoint } from '@typings';
import * as S from './styles';
import 'antd/dist/antd.dark.css';
import WorkCard from '@components/User/WorkCarousel/WorkCard';

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
  const { data: myWorks } = useSWR<MyWorks>('/user/works', axiosFetcher);

  if (!myWorks) {
    return <Card loading />;
  }
  if (myWorks.length === 0) {
    return <EmptyWork />;
  }
  return (
    <>
      <Global styles={S.globalCSS} />
      <Carousel dotPosition="top" infinite>
        {myWorks.map((work) => (
          <WorkCard work={work} />
        ))}
      </Carousel>
    </>
  );
};

export default WorkCarousel;
