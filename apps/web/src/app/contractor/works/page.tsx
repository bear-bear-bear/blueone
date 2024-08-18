'use client';
import { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, DatePicker, Table } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AddWork } from '@/features/contractor/work/add';
import { useFetchWorks } from '@/features/contractor/work/list';
import type { User, DateRange, ItemOf } from '@/shared/api/types';
import { GetListResponse } from '@/shared/api/types/works';
import { useBool } from '@/shared/lib/hooks/use-bool.hook';
import { LoadingPanel } from '@/shared/ui/components/loading-panel';
import { SubcontractorSelector } from '@/widgets/subcontractor-selector';
import { SnippetsOutlined } from '@ant-design/icons';
import columns from './columns';
import TotalFee from './total-fee.component';

const { RangePicker } = DatePicker;

export default function WorksManagementPage() {
  const times = getTimes();
  const defaultDateRange = {
    startDate: times.threeDaysAgo.format('YYYY-MM-DD'),
    endDate: times.today.format('YYYY-MM-DD'),
  };
  const defaultBookingDateRange = {
    startDate: times.tomorrow.format('YYYY-MM-DD'),
    endDate: times.fourDaysLater.format('YYYY-MM-DD'),
  };

  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [pickedUserId, setPickedUserId] = useState<User['id']>();
  const [showPastCompletedWorks, togglePastCompletedWorks] = useBool(false);
  const [showBookedWorks, toggleBookedWorks] = useBool(false, (next) => {
    if (next) {
      setDateRange(defaultBookingDateRange);
    } else {
      setDateRange(defaultDateRange);
    }
  });
  const [showTotalFee, toggleTotalFee] = useBool(false);

  const { data: works } = useFetchWorks({
    ...dateRange,
    booked: showBookedWorks,
  });

  const dataSource = useMemo<GetListResponse>(() => {
    if (!works) return [];
    return works
      .filter((work) => {
        const isCompletedAtPast = !!work.endTime && +new Date(work.endTime) < times.todayStart.valueOf();
        return showPastCompletedWorks || !isCompletedAtPast;
      })
      .filter((work) => {
        if (!pickedUserId) return true;
        return work.userId === pickedUserId;
      });
  }, [works, times.todayStart, showPastCompletedWorks, pickedUserId]);

  const filteredColumns = useMemo<ColumnsType<ItemOf<GetListResponse>>>(() => {
    if (showBookedWorks) {
      return columns.filter((v) => v.key !== 'createdAt');
    }
    return columns.filter((v) => v.key !== 'bookingDate');
  }, [showBookedWorks]);

  const handleChangeRangePicker: NonNullable<RangePickerProps['onChange']> = (_, [startDate, endDate]) => {
    setDateRange({
      startDate: startDate,
      endDate: endDate,
    });
  };

  useEffect(() => {
    setDateRange(showBookedWorks ? defaultBookingDateRange : defaultDateRange);
  }, [showBookedWorks]);

  if (!dataSource) {
    return <LoadingPanel />;
  }
  return (
    <>
      <div className="flex flex-wrap justify-between mb-2 gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <RangePicker
            presets={
              showBookedWorks
                ? [
                    {
                      label: 'Default',
                      value: [dayjs(defaultBookingDateRange.startDate), dayjs(defaultBookingDateRange.endDate)],
                    },
                    {
                      label: 'This Month',
                      value: [times.tomorrow, times.thisMonthEnd],
                    },
                  ]
                : [
                    {
                      label: 'Default',
                      value: [dayjs(defaultDateRange.startDate), dayjs(defaultDateRange.endDate)],
                    },
                    {
                      label: 'Today',
                      value: [times.today, times.today],
                    },
                    {
                      label: 'This Month',
                      value: [times.thisMonthStart, times.today],
                    },
                  ]
            }
            onChange={handleChangeRangePicker}
            value={dateRange && [dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
            disabledDate={(current: dayjs.Dayjs) => {
              if (showBookedWorks) {
                return current && current < dayjs().endOf('day');
              }
              return current && current > dayjs().endOf('day');
            }}
            allowClear={false}
            className="mr-2"
          />

          <SubcontractorSelector
            value={pickedUserId}
            onChange={setPickedUserId}
            placeholder="모든 기사의 업무 표시"
            className="w-64"
          />

          <div className="flex items-center gap-2">
            <Checkbox checked={showPastCompletedWorks} disabled={showBookedWorks} onChange={togglePastCompletedWorks}>
              과거 목록
            </Checkbox>
            <Checkbox checked={showBookedWorks} disabled={showPastCompletedWorks} onChange={toggleBookedWorks}>
              예약 목록
            </Checkbox>
            <Checkbox checked={showTotalFee} onChange={toggleTotalFee}>
              지수 합계
            </Checkbox>
          </div>
        </div>

        <AddWork
          trigger={({ openModal, isPending }) => (
            <Button type="default" onClick={openModal} loading={isPending}>
              등록
            </Button>
          )}
        />
      </div>

      <Table
        rowKey={(work) => work.id}
        dataSource={dataSource}
        columns={filteredColumns}
        rowClassName={(record) => {
          if (!record.endTime) return 'bg-white';

          return 'bg-gray-300 [&_.ant-table-cell-row-hover]:!bg-gray-300';
        }}
        expandable={{
          expandedRowRender: renderRemark,
          expandIcon: ({ onExpand, record }) => {
            if (!record.remark) return null;
            return <SnippetsOutlined onClick={(e) => onExpand(record, e)} />;
          },
          rowExpandable: (record) => !!record.remark,
          columnWidth: 30,
        }}
        showSorterTooltip={false}
        pagination={{ position: ['bottomLeft'] }}
        size="middle"
        bordered
        summary={() => {
          if (!showTotalFee) return null;
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length}>
                  <div className="flex justify-end">
                    <TotalFee works={works ?? []} />
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </>
  );
}

function renderRemark(work: ItemOf<GetListResponse>) {
  return (
    <div className="p-1 text-center">
      <span className="underline">비고:</span>
      &nbsp;
      {work.remark ?? '-'}
    </div>
  );
}

function getTimes() {
  const today = dayjs();
  const todayStart = today.startOf('d');
  const tomorrow = today.startOf('day').add(1, 'day');
  const threeDaysAgo = today.subtract(3, 'days');
  const fourDaysLater = today.add(3, 'days');
  const thisMonthStart = today.startOf('month');
  const thisMonthEnd = today.endOf('month');

  return {
    today,
    todayStart,
    tomorrow,
    threeDaysAgo,
    fourDaysLater,
    thisMonthStart,
    thisMonthEnd,
  };
}
