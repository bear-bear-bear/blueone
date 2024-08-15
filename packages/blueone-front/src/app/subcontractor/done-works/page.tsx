'use client';
import { useState } from 'react';
import { Alert, List } from 'antd';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import { WorkCard } from '@/components/subcontractor/work-card';
import { DateRange, EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import CustomRangePicker from './range-picker.component';

type Works = EndPoint['GET /user/works/complete']['responses']['200'];

export default function DoneWorksPage() {
  const today = dayjs();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const SEVEN_DAYS_AGO_YYYY_MM_DD = today.subtract(7, 'days').format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: SEVEN_DAYS_AGO_YYYY_MM_DD,
    endDate: TODAY_YYYY_MM_DD,
  });
  const { data: works } = useSWR<Works>(`/user/works/complete?${qs.stringify(dateRange)}`, axiosFetcher);

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
      />
    </>
  );
}
