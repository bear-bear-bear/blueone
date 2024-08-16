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
import Empty from '@/components/subcontractor/empty.component';
import theme from '@/shared/ui/foundation/theme';
import useAnalyzeIncome from '../api/use-analyze-income.query';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyzeByMonth({ chartHeight }: { chartHeight: number }) {
  const { data: analysis } = useAnalyzeIncome({ by: 'day' });

  const chartData: ChartData<'bar', number[], string> = {
    labels: Object.keys(analysis ?? {}).map((month) => `${month}일`),
    datasets: [
      {
        label: '지수합계',
        data: Object.values(analysis ?? {}),
        backgroundColor: theme.colors.primary,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const thisDate = dayjs().date();

  if (!analysis) {
    return <Skeleton />;
  }
  if (!chartData.labels?.length) {
    return <Empty description="이번 달에 완료된 업무가 아직 없어요 :)" />;
  }
  return (
    <>
      <header className="mt-4 mb-6">
        <p className="text-sm mb-2.5 text-gray-400">※ 익일입고는 확인 시점으로 정산됩니다.</p>
        {thisDate !== 1 && <p>어제자 지수 합계: {analysis[`${thisDate - 1}`]}</p>}
        <h1 className="text-white text-xl">오늘자 지수 합계: {analysis[`${thisDate}`]}</h1>
      </header>

      <Bar data={chartData} options={options} height={chartHeight} />
    </>
  );
}
