import { MouseEventHandler, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import { axiosFetcher } from '@utils/swr';
import { Button, Spin, Table } from 'antd';
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
  const thisYear = dayjs().year();
  const createdAt = dayjs(work.createdAt);
  const updatedAt = dayjs(work.updatedAt);

  return {
    processedCheckTime: work.checkTime ? dayjs(work.checkTime).format('A hh:mm') : '-',
    processedEndTime: work.endTime ? dayjs(work.endTime).format('A hh:mm') : '-',
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
const WorkTable = () => {
  const today = dayjs();
  const TODAY_START_MS = today.startOf('d').valueOf();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    start: TODAY_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/works?${qs.stringify(dateRange)}`;
  const { data: works } = useSWR<FullWorks>(swrKey, axiosFetcher, {
    refreshInterval: 30 * 1000,
  });

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works.map((work) => ({
      ...work,
      ...processWorkDateTimes(work),
      payout: ((work.charge + (work.subsidy || 0)) * (8 / 10)).toFixed(1),
      realname: work.User?.UserInfo?.realname,
      isDone: work.endTime !== null || +new Date(work.createdAt) < TODAY_START_MS,
      swrKey,
    }));
  }, [works, TODAY_START_MS, swrKey]);

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
        <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
        <AddButton
          Button={({ onClick }) => (
            <Button type="default" onClick={onClick}>
              업무 등록
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

export default WorkTable;
