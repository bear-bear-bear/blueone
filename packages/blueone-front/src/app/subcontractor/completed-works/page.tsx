'use client';
import { useState } from 'react';
import { Alert, List } from 'antd';
import dayjs from 'dayjs';
import { WorkCard } from '@/components/subcontractor/work-card';
import { useFetchCompletedWorks } from '@/features/subcontractor/list-completed-works';
import { DateRange } from '@/shared/api/types';
import CustomRangePicker from './range-picker.component';

export default function CompletedWorksPage() {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = dayjs();

    return {
      startDate: today.subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: today.format('YYYY-MM-DD'),
    };
  });
  const { data: works, isPending } = useFetchCompletedWorks(dateRange);

  return (
    <>
      <Alert
        banner
        type="info"
        message={
          <ul>
            <li>- 업무 완료일 기준으로 검색됩니다.</li>
            <li>- 약 3개월 이내 완료된 업무만 검색할 수 있습니다.</li>
            <li>- 카드 상단의 날짜는 해당 업무의 완료일입니다.</li>
          </ul>
        }
        className="mb-2"
      />

      <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} />

      <List
        itemLayout="horizontal"
        dataSource={works}
        renderItem={(work) => <WorkCard work={work} readOnly className="mt-6" />}
        loading={isPending}
      />
    </>
  );
}
