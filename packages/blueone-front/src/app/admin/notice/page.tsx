'use client';
import { useMemo, useState } from 'react';
import { Spin, Table } from 'antd';
import Linkify from 'linkify-react';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Unpacked } from '@/typings';
import dayjs from '@/utils/dayjs';
import { axiosFetcher } from '@/utils/swr';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import AddButton from './add-button.component';
import columns from './columns';
import CustomRangePicker from './custom-range-picker.component';

export type DateRange = {
  start: string;
  end: string;
};
export type NoticeList = EndPoint['GET /notice']['responses']['200'];
type Notice = Unpacked<NoticeList>;
export type ProcessedNotice = Notice & {
  processedCreatedAt: string;
  processedStartDate: string;
  processedEndDate: string;
  swrKey: string;
};

export default function NoticeBoard() {
  const today = dayjs();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const SEVEN_DAYS_AGO_YYYY_MM_DD = today.subtract(7, 'days').format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    start: SEVEN_DAYS_AGO_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/notice?${qs.stringify(dateRange)}`;
  const { data: noticeList } = useSWRImmutable<NoticeList>(swrKey, axiosFetcher, {
    revalidateOnMount: true,
  });

  const dataSource: ProcessedNotice[] | undefined = useMemo(() => {
    if (!noticeList) return undefined;
    return noticeList.map((notice) => ({
      ...notice,
      ...processNoticeCreatedAt(notice),
      swrKey,
    }));
  }, [noticeList, swrKey]);

  if (!noticeList) {
    return (
      <SpinnerWrapper>
        <Spin size="default" />
      </SpinnerWrapper>
    );
  }
  return (
    <Container>
      <Global styles={globalStyles} />
      <TableHeader>
        <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <AddButton swrKey={swrKey} />
      </TableHeader>
      <Table
        id="noticeBoard"
        dataSource={dataSource}
        columns={columns}
        rowKey={(notice) => notice.id}
        expandable={{
          expandedRowRender: (notice) => <LinkifyPre tagName="pre">{notice.content}</LinkifyPre>,
          expandRowByClick: true,
          showExpandColumn: false,
        }}
        pagination={{ position: ['bottomLeft'] }}
        size="middle"
        bordered
      />
    </Container>
  );
}

function processNoticeCreatedAt(notice: Notice) {
  const thisYear = dayjs().year();
  const createdAt = dayjs(notice.createdAt);
  const startDate = dayjs(notice.startDate);
  const endDate = dayjs(notice.endDate);

  return {
    processedCreatedAt: createdAt.format(createdAt.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
    processedStartDate: startDate.format(startDate.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
    processedEndDate: endDate.format(endDate.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
  };
}

const globalStyles = css`
  .ant-table-row {
    cursor: pointer;
  }

  .notice-board__non-padding-td {
    padding: 0 !important;
  }

  .notice-board__expanded-row {
    td {
      //background: #ddd !important;
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.66rem;
  margin-bottom: 0.66rem;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LinkifyPre = styled(Linkify)`
  padding: 0.66rem 1.33rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
`;
