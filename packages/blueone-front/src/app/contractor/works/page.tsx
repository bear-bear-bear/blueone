'use client';
import { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, DatePicker, Table } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import type { EndPoint, UserInfo, ItemOf, User, DateRange } from '@/shared/api/types';
import { formatTime } from '@/shared/lib/utils/day';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { LoadingPanel } from '@/shared/ui/components/loading-panel';
import { SubcontractorSelector2 } from '@/widgets/subcontractor-selector';
import { SnippetsOutlined } from '@ant-design/icons';
import AddButton from './add-button.component';
import columns from './columns';
import processWorkDateTimes from './process-work-date-times';
import TotalFee from './total-fee.component';

const { RangePicker } = DatePicker;

export type FullWorks = EndPoint['GET /works']['responses']['200'];
export type FullWork = ItemOf<FullWorks>;
export type ProcessedWork = FullWork & {
  processedCheckTime: string;
  processedEndTime: string;
  processedCreatedAt: string | null;
  processedUpdatedAt: string | null;
  processedBookingDate: string | null;
  realname?: UserInfo['realname'];
  isDone: boolean;
  swrKey: string;
};

export default function WorkManagementTable() {
  const [pickedUserId, setPickedUserId] = useState<User['id'] | null>(null);
  const [isVisiblePastDoneWork, setIsVisiblePastDoneWork] = useState(false);
  const [isVisibleBookedWork, setIsVisibleBookedWork] = useState(false);
  const [isShowTotalFee, setIsShowTotalFee] = useState(false);

  const today = dayjs();
  const times = formatTime(today);

  const defaultDateRange = {
    startDate: times.threeDaysAgoDate,
    endDate: times.todayDate,
  };
  const defaultBookingDateRange = {
    startDate: times.tomorrowDate,
    endDate: times.fourDaysLaterDate,
  };

  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

  const disabledDate = (current: dayjs.Dayjs) => {
    if (isVisibleBookedWork) {
      return current && current < dayjs().endOf('day');
    }
    return current && current > dayjs().endOf('day');
  };

  const swrKey = (() => {
    if (isVisibleBookedWork) {
      return `/works?${qs.stringify({ ...dateRange, booked: true })}`;
    }
    return `/works?${qs.stringify(dateRange)}`;
  })();

  const { data: works } = useSWR<FullWorks>(swrKey, axiosFetcher, {
    refreshInterval: 30 * 1000,
  });

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works
      .filter((work) => {
        const isDoneAtPast = work.endTime !== null && +new Date(work.endTime) < times.todayStartMS;
        return isVisiblePastDoneWork || !isDoneAtPast;
      })
      .filter((work) => {
        if (pickedUserId === null) return true;
        return work.userId === pickedUserId;
      })
      .map((work) => ({
        ...work,
        ...processWorkDateTimes(work),
        realname: work.User?.UserInfo?.realname,
        isDone: work.endTime !== null,
        swrKey,
      }));
  }, [works, times.todayStartMS, isVisiblePastDoneWork, pickedUserId, swrKey]);

  const filteredColumns = useMemo<ColumnsType<ProcessedWork>>(() => {
    if (isVisibleBookedWork) {
      return columns.filter((v) => v.key !== 'processedCreatedAt');
    }
    return columns.filter((v) => v.key !== 'processedBookingDate');
  }, [isVisibleBookedWork]);

  const handleChangeVisiblePastDoneWorkCheckbox = () => {
    setIsVisiblePastDoneWork((prev) => !prev);
  };

  const handleChangeVisibleBookedWorkCheckbox = () => {
    setIsVisibleBookedWork((prev) => {
      const next = !prev;

      if (next) {
        setDateRange(defaultBookingDateRange);
      } else {
        setDateRange(defaultDateRange);
      }

      return next;
    });
  };

  const handleChangeShowTotalFeeCheckbox = () => {
    setIsShowTotalFee((prev) => !prev);
  };

  const handleChangeRangePicker: NonNullable<RangePickerProps['onChange']> = (_, [startDate, endDate]) => {
    setDateRange({
      startDate: startDate,
      endDate: endDate,
    });
  };

  useEffect(() => {
    setDateRange(isVisibleBookedWork ? defaultBookingDateRange : defaultDateRange);
  }, [isVisibleBookedWork]);

  if (!dataSource) {
    return <LoadingPanel />;
  }
  return (
    <>
      <div className="flex flex-wrap justify-between mb-2 gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <RangePicker
            presets={
              isVisibleBookedWork
                ? [
                    {
                      label: 'Default',
                      value: [dayjs(defaultBookingDateRange.startDate), dayjs(defaultBookingDateRange.endDate)],
                    },
                    {
                      label: 'This Month',
                      value: [times.tomorrow, today.endOf('month')],
                    },
                  ]
                : [
                    {
                      label: 'Default',
                      value: [dayjs(defaultDateRange.startDate), dayjs(defaultDateRange.endDate)],
                    },
                    {
                      label: 'Today',
                      value: [today, today],
                    },
                    {
                      label: 'This Month',
                      value: [today.startOf('month'), today],
                    },
                  ]
            }
            onChange={handleChangeRangePicker}
            value={dateRange && [dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
            disabledDate={disabledDate}
            allowClear={false}
            className="mr-2"
          />

          <SubcontractorSelector2 value={pickedUserId} setValue={setPickedUserId} />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={isVisiblePastDoneWork}
              disabled={isVisibleBookedWork}
              onChange={handleChangeVisiblePastDoneWorkCheckbox}
            >
              과거 목록
            </Checkbox>
            <Checkbox
              checked={isVisibleBookedWork}
              disabled={isVisiblePastDoneWork}
              onChange={handleChangeVisibleBookedWorkCheckbox}
            >
              예약 목록
            </Checkbox>
            <Checkbox checked={isShowTotalFee} onChange={handleChangeShowTotalFeeCheckbox}>
              지수 합계
            </Checkbox>
          </div>
        </div>

        <AddButton
          swrKey={swrKey}
          render={(onClick) => (
            <Button type="default" onClick={onClick}>
              등록
            </Button>
          )}
        />
      </div>

      <Table
        id="workListTable"
        dataSource={dataSource}
        columns={filteredColumns}
        rowClassName={(record) => {
          if (!record.isDone) return 'bg-white';

          return 'bg-gray-300 [&_.ant-table-cell-row-hover]:!bg-gray-300';
        }}
        expandable={{
          expandedRowRender: (work) => <Remark work={work} />,
          expandIcon: ({ onExpand, record }) => {
            if (!record.remark) return null;
            return <SnippetsOutlined onClick={(e) => onExpand(record, e)} />;
          },
          rowExpandable: (record) => !!record.remark,
          columnWidth: 30,
        }}
        showSorterTooltip={false}
        rowKey={(work) => work.id}
        pagination={{ position: ['bottomLeft'] }}
        size="middle"
        bordered
        summary={() => {
          if (!isShowTotalFee) return null;
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length}>
                  <div className="flex justify-end">
                    <TotalFee workData={dataSource} />
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

function Remark({ work }: { work: ProcessedWork }) {
  return (
    <div className="p-1 text-center">
      <span className="underline">비고:</span>
      &nbsp;
      {work.remark ?? '-'}
    </div>
  );
}
