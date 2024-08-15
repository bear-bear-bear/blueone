import { useMemo } from 'react';
import { Skeleton } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import useSWRImmutable from 'swr/immutable';
import Empty from '@/components/subcontractor/empty.component';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import theme from '@/shared/ui/foundation/theme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Response = EndPoint['GET /user/works/analysis']['responses']['200'];

export default function AnalyzeByMonth() {
  const { data: workAnalysis } = useSWRImmutable<Response>('/user/works/analysis?by=month', axiosFetcher, {
    revalidateOnMount: true,
  });

  const chartData: ChartData<'bar', number[], string> = useMemo(() => {
    const labels = Object.keys(workAnalysis ?? {}).map((month) => `${month}월`);
    const data = Object.values(workAnalysis ?? {});
    return {
      labels,
      datasets: [
        {
          label: '지수합계',
          data,
          backgroundColor: theme.colors.primary,
        },
      ],
    };
  }, [workAnalysis]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const thisMonth = dayjs().month() + 1; // dayjs month is 0~11

  if (!workAnalysis) {
    return <Skeleton />;
  }
  if (!chartData.labels?.length) {
    return <Empty description="아직 완료된 업무가 없어요 :)" />;
  }
  return (
    <>
      <header className="mt-4 mb-6">
        <p className="text-sm mb-2.5 text-gray-400">※ 익일입고는 확인 시점으로 정산됩니다.</p>
        {thisMonth !== 1 && <p>지난 달 지수 합계: {workAnalysis[`${thisMonth - 1}`]}</p>}
        <h1 className="text-white text-xl">이번 달 지수 합계: {workAnalysis[`${thisMonth}`]}</h1>
      </header>

      <Bar data={chartData} options={options} height={360} />
    </>
  );
}
