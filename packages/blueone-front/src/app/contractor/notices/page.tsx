'use client';
import { useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import Linkify from 'linkify-react';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import { AddNotice } from '@/features/contractor/notice/add';
import { DateRange, EndPoint, Unpacked } from '@/shared/api/types';
import dayjs from '@/shared/lib/utils/dayjs';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { LoadingPanel } from '@/shared/ui/components/loading-panel';
import columns from './columns';
import CustomRangePicker from './custom-range-picker.component';

export type NoticeList = EndPoint['GET /notices']['responses']['200'];
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
    startDate: SEVEN_DAYS_AGO_YYYY_MM_DD,
    endDate: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/notices?${qs.stringify(dateRange)}`;
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
    return <LoadingPanel />;
  }
  return (
    <div className="max-w-screen-lg">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
        <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <AddNotice
          trigger={({ openModal, isPending }) => (
            <Button type="default" onClick={openModal} loading={isPending}>
              등록
            </Button>
          )}
        />
      </div>
      <Table
        id="noticeBoard"
        dataSource={dataSource}
        columns={columns}
        rowKey={(notice) => notice.id}
        rowClassName="cursor-pointer"
        expandable={{
          expandedRowRender: (notice) => (
            <Linkify tagName="pre" className="px-2.5 whitespace-pre-wrap break-words font-[inherit]">
              {notice.content}
            </Linkify>
          ),
          expandRowByClick: true,
          showExpandColumn: false,
        }}
        pagination={{ position: ['bottomLeft'] }}
        size="middle"
        bordered
      />
    </div>
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
