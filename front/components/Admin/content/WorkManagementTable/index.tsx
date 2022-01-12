import { MouseEventHandler, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import { axiosFetcher } from '@utils/swr';
import { Button, Checkbox, Spin, Table } from 'antd';
import { SnippetsOutlined } from '@ant-design/icons';
import { Global } from '@emotion/react';
import type { EndPoint, UserInfo, Unpacked } from '@typings';
import DatePicker from './DatePicker';
import AddButton from './AddButton';
import columns from './columns';
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
  payout: string | number;
  realname?: UserInfo['realname'];
  isDone: boolean;
  swrKey: string;
};

const processWorkDateTimes = (work: FullWork) => {
  const checkTime = dayjs(work.checkTime);
  const endTime = dayjs(work.endTime);

  const thisYear = dayjs().year();
  const createdAt = dayjs(work.createdAt);
  const createdAtDayStart = createdAt.startOf('day').valueOf();
  const updatedAt = dayjs(work.updatedAt);

  return {
    processedCheckTime: work.checkTime
      ? checkTime.format(checkTime.startOf('day').valueOf() === createdAtDayStart ? 'A hh:mm' : 'MM/DD_A hh:mm')
      : '-',
    processedEndTime: work.endTime
      ? endTime.format(endTime.startOf('day').valueOf() === createdAtDayStart ? 'A hh:mm' : 'MM/DD_A hh:mm')
      : '-',
    processedCreatedAt: createdAt.format(createdAt.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
    processedUpdatedAt: updatedAt.format(updatedAt.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
  };
};

const Remark = ({ work }: { work: ProcessedWork }) => (
  <S.Remark>
    <span>비고:</span>
    &nbsp;
    {work.remark ?? '-'}
  </S.Remark>
);

// TODO: 확인과 완료 check box 로 work 필터링 하는 기능 작성
const WorkManagementTable = () => {
  const today = dayjs();
  const TODAY_START_MS = today.startOf('d').valueOf();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const THREE_DAYS_AGO_YYYY_MM_DD = today.subtract(3, 'days').format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    start: THREE_DAYS_AGO_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/works?${qs.stringify(dateRange)}`;
  const { data: works } = useSWR<FullWorks>(swrKey, axiosFetcher, {
    refreshInterval: 30 * 1000,
  });
  const [isVisiblePastDoneWork, setIsVisiblePastDoneWork] = useState<boolean>(false);

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works
      .filter((work) => {
        const isDoneAtPast = work.endTime !== null && +new Date(work.endTime) < TODAY_START_MS;
        return isVisiblePastDoneWork || !isDoneAtPast;
      })
      .map((work) => ({
        ...work,
        ...processWorkDateTimes(work),
        payout: ((work.charge + (work.subsidy || 0)) * (8 / 10)).toFixed(1),
        realname: work.User?.UserInfo?.realname,
        isDone: work.endTime !== null,
        swrKey,
      }));
  }, [works, TODAY_START_MS, swrKey, isVisiblePastDoneWork]);

  const handleChangeCheckbox = () => {
    setIsVisiblePastDoneWork((prev) => !prev);
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
          <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Checkbox onChange={handleChangeCheckbox} style={{ marginLeft: '0.66rem' }}>
            지난 날짜에 완료된 작업 표시
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
        columns={columns}
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
      />
    </>
  );
};

export default WorkManagementTable;
