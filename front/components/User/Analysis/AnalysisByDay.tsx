import useSWRImmutable from 'swr/immutable';
import { EndPoint } from '@typings';
import { axiosFetcher } from '@utils/swr';
import dayjs from 'dayjs';

type Response = EndPoint['GET /user/works/analysis']['responses']['200'];

const AnalysisByDay = () => {
  const { data: workAnalysis } = useSWRImmutable<Response>('/user/works/analysis?by=day', axiosFetcher, {
    revalidateOnMount: true,
  });
  const thisDate = dayjs().date();

  console.log('byDay', workAnalysis);

  if (!workAnalysis) return null;
  return (
    <>
      <p>오늘의 지수 합계: {workAnalysis[`${thisDate}`]}</p>
    </>
  );
};

export default AnalysisByDay;
