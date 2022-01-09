import useSWRImmutable from 'swr/immutable';
import { EndPoint } from '@typings';
import { axiosFetcher } from '@utils/swr';
import dayjs from 'dayjs';

type Response = EndPoint['GET /user/works/analysis']['responses']['200'];

const AnalysisByMonth = () => {
  const { data: workAnalysis } = useSWRImmutable<Response>('/user/works/analysis?by=month', axiosFetcher, {
    revalidateOnMount: true,
  });
  const thisMonth = dayjs().month() + 1; // dayjs month is 0~11

  console.log('byMonth', workAnalysis);

  if (!workAnalysis) return null;
  return (
    <>
      <p>이번 달의 지수 합계: {workAnalysis[`${thisMonth}`]}</p>
    </>
  );
};

export default AnalysisByMonth;
