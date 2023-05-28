import { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import CustomRangePicker from 'components/Admin/content/WorkManagementTable/CustomRangePicker';
import dayjs from 'dayjs';
import { merge } from 'lodash';
import qs from 'qs';
import useSWR from 'swr';
import type { EndPoint, UserInfo, Unpacked, User } from '@typings';
import { SnippetsOutlined } from '@ant-design/icons';
import { Global } from '@emotion/react';
import { formatTime } from '@utils/day';
import { axiosFetcher } from '@utils/swr';
import AddButton from './AddButton';
import TotalFee from './TotalFee';
import UserPicker from './UserPicker';
import columns from './columns';
import processWorkDateTimes from './processWorkDateTimes';
import * as S from './styles';

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
  payout: string | number;
  realname?: UserInfo['realname'];
  isDone: boolean;
  swrKey: string;
};

const Remark = ({ work }: { work: ProcessedWork }) => (
  <S.Remark>
    <span>비고:</span>
    &nbsp;
    {work.remark ?? '-'}
  </S.Remark>
);

const WorkManagementTable = () => {
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
      return `/works?${qs.stringify(merge(dateRange, { booked: true }))}`;
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
        payout: (() => {
          // 지원지수가 음수라면 수식을 다르게 해달라는 요청사항 반영
          const subsidy = work.subsidy ?? 0;
          return subsidy >= 0 ? ((work.charge + subsidy) * 8) / 10 : (work.charge * 8) / 10 + subsidy;
        })(),
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
      <S.SpinnerWrapper>
        <Spin size="default" />
      </S.SpinnerWrapper>
    );
  }
  return (
    <>
      <Global styles={S.globalCSS} />
      <S.TableHeader>
        <section>
          <CustomRangePicker dateRange={dateRange} setDateRange={setDateRange} disabledDate={disabledDate} />
          <UserPicker pickedUserId={pickedUserId} setPickedUserId={setPickedUserId} />
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
          Button={({ onClick }) => (
            <Button type="default" onClick={onClick}>
              등록
            </Button>
          )}
        />
      </S.TableHeader>
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
                  <S.TotalFeeSection>
                    <TotalFee workData={dataSource} />
                  </S.TotalFeeSection>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </>
  );
};

export default WorkManagementTable;
