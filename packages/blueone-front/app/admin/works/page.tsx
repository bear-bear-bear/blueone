'use client';
import { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import type { EndPoint, UserInfo, Unpacked, User } from '@typings';
import { SnippetsOutlined } from '@ant-design/icons';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { formatTime } from '@utils/day';
import { axiosFetcher } from '@utils/swr';
import AddButton from './AddButton';
import CustomRangePicker from './CustomRangePicker';
import TotalFee from './TotalFee';
import UserPicker from './UserPicker';
import columns from './columns';
import processWorkDateTimes from './processWorkDateTimes';

export type DateRange = {
  start: string;
  end: string;
};
export type FullWorks = EndPoint['GET /works']['responses']['200'];
export type FullWork = Unpacked<FullWorks>;
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
  const [isVisiblePastDoneWork, setIsVisiblePastDoneWork] = useState<boolean>(false);
  const [isVisibleBookedWork, setIsVisibleBookedWork] = useState<boolean>(false);
  const [isShowTotalFee, setIsShowTotalFee] = useState<boolean>(false);

  const times = useMemo(() => formatTime(dayjs()), []);

  const defaultDateRange = useMemo(
    () => ({
      start: times.threeDaysAgoDate,
      end: times.todayDate,
    }),
    [times],
  );
  const defaultBookingDateRange = useMemo(
    () => ({
      start: times.todayDate,
      end: times.threeDaysLaterDate,
    }),
    [times],
  );
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      if (isVisibleBookedWork) {
        return current && current < dayjs().endOf('day');
      }
      return current && current > dayjs().endOf('day');
    },
    [isVisibleBookedWork],
  );

  const swrKey = useMemo(() => {
    if (isVisibleBookedWork) {
      return `/works?${qs.stringify({ ...dateRange, booked: true })}`;
    }
    return `/works?${qs.stringify(dateRange)}`;
  }, [dateRange, isVisibleBookedWork]);
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

  if (!dataSource) {
    return (
      <SpinnerWrapper>
        <Spin size="default" />
      </SpinnerWrapper>
    );
  }
  return (
    <>
      <Global styles={globalCSS} />
      <TableHeader>
        <section>
          <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} disabledDate={disabledDate} />
          <UserPicker value={pickedUserId} setValue={setPickedUserId} />
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
        </section>
        <AddButton
          swrKey={swrKey}
          render={(onClick) => (
            <Button type="default" onClick={onClick}>
              등록
            </Button>
          )}
        />
      </TableHeader>
      <Table
        id="workListTable"
        dataSource={dataSource}
        columns={filteredColumns}
        rowClassName={(record) => (record.isDone ? 'row--work-done' : '')}
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
                  <TotalFeeSection>
                    <TotalFee workData={dataSource} />
                  </TotalFeeSection>
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
    <RemarkWrap>
      <span>비고:</span>
      &nbsp;
      {work.remark ?? '-'}
    </RemarkWrap>
  );
}

const globalCSS = css`
  tr {
    background: #fff !important;
  }

  .row--work-done {
    background: #ccc !important;
    transition: none;

    td {
      transition: background 0.1s !important;
    }
    &:hover td,
    &:focus td {
      background: #ccc !important;
    }

    .ant-table-cell-row-hover {
      background: #ccc !important;
    }
  }

  .ant-modal-body .ant-form-horizontal div:last-of-type {
    margin-bottom: 0;
  }

  .ant-picker-time-panel-cell-inner::after {
    content: ':00'; // 트릭 - BookingDatePicker 에서 picker panel 의 hour 에 :00 붙이고 싶은데 rc-picker 에서 패널 렌더 prop 을 제공하지 않음
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.66rem;
  margin-bottom: 0.66rem;

  section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.66rem;

    .ant-checkbox-wrapper {
      margin-left: 0;
    }
  }
`;

const TotalFeeSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const RemarkWrap = styled.p`
  padding: 0 16px;
  text-align: center;

  span {
    text-decoration: underline;
  }
`;
