import { useState } from 'react';
import { Alert, List } from 'antd';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import CustomRangePicker from '@/components/User/DoneWorkSearch/RangePicker';
import WorkCard from '@/components/User/WorkCard';
import { EndPoint, Unpacked } from '@/typings';
import { axiosFetcher } from '@/utils/swr';
import styled from '@emotion/styled';

export type DateRange = {
  start: string;
  end: string;
};
export type Works = EndPoint['GET /user/works/prev']['responses']['200'];
export type Work = Unpacked<Works>;

const DoneWorkSearch = () => {
  const today = dayjs();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const SEVEN_DAYS_AGO_YYYY_MM_DD = today.subtract(7, 'days').format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    start: SEVEN_DAYS_AGO_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/user/works/prev?${qs.stringify(dateRange)}`;
  const { data: works } = useSWR<Works>(swrKey, axiosFetcher);

  return (
    <>
      <StyledAlert
        banner
        type="info"
        message={
          <ul>
            <li>- 업무 완료일 기준으로 검색됩니다.</li>
            <li>- 약 3개월 이내 완료된 업무만 검색할 수 있습니다.</li>
            <li>- 카드 상단의 날짜는 해당 업무의 완료일입니다.</li>
          </ul>
        }
      />
      <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <List itemLayout="horizontal" dataSource={works} renderItem={(work) => <WorkCard work={work} readOnly />} />
    </>
  );
};

const StyledAlert = styled(Alert)`
  margin-bottom: 0.33rem;
`;

export default DoneWorkSearch;
