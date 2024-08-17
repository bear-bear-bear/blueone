'use client';
import { useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import Linkify from 'linkify-react';
import { AddNotice } from '@/features/contractor/notice/add';
import { useFetchNotices } from '@/features/contractor/notice/list';
import { DateRange } from '@/shared/api/types';
import dayjs from '@/shared/lib/utils/dayjs';
import { LoadingPanel } from '@/shared/ui/components/loading-panel';
import columns, { preFormatDates } from './columns';
import CustomRangePicker from './custom-range-picker.component';

export default function NoticesManagementPage() {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = dayjs();

    return {
      startDate: today.subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: today.format('YYYY-MM-DD'),
    };
  });

  const { data: notices = [], isPending } = useFetchNotices(dateRange);
  const dataSource = useMemo(() => notices.map(preFormatDates), [notices]);

  if (isPending) {
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
        rowKey={(notice) => notice.id}
        dataSource={dataSource}
        columns={columns}
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
