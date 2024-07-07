import { useMemo } from 'react';
import { Skeleton } from 'antd';
import dayjs from 'dayjs';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint } from '@typings';
import { Column } from '@ant-design/plots';
import EmptyContent from '@components/User/commonParts/Empty';
import theme from '@globalStyles/theme';
import { axiosFetcher } from '@utils/swr';
import * as S from './styles';

type Response = EndPoint['GET /user/works/analysis']['responses']['200'];

const AnalysisByMonth = () => {
  const { data: workAnalysis } = useSWRImmutable<Response>('/user/works/analysis?by=month', axiosFetcher, {
    revalidateOnMount: true,
  });
  const chartData = useMemo(
    () =>
      Object.entries(workAnalysis ?? {}).map(([day, totalPayment]) => ({
        월: `${day}월`,
        지수합계: totalPayment,
      })),
    [workAnalysis],
  );
  const thisMonth = dayjs().month() + 1; // dayjs month is 0~11

  if (!workAnalysis) {
    return <Skeleton />;
  }
  if (chartData.length === 0) {
    return <EmptyContent description="아직 완료된 업무가 없어요 :)" />;
  }
  return (
    <>
      <S.Header>
        <section className="announcement">
          <p>※ 익일입고는 확인 시점으로 정산됩니다.</p>
        </section>
        {thisMonth !== 1 && <p>지난 달 지수 합계: {workAnalysis[`${thisMonth - 1}`]}</p>}
        <h1>이번 달 지수 합계: {workAnalysis[`${thisMonth}`]}</h1>
      </S.Header>
      <Column data={chartData} xField="월" yField="지수합계" color={theme.primaryColor} />
    </>
  );
};

export default AnalysisByMonth;
