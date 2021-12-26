import { Table } from 'antd';
import dayjs from 'dayjs';
import type { Work } from '@typings';
import fakeWorks from './fakeWorks';
import columns from './columns';

export type ProcessedWork = Work & {
  processedCheckTime: string;
  processedEndTime: string;
  processedCreatedAt: string | null;
  processedUpdatedAt: string | null;
  payout: string | number;
};

const processWorkDateTimes = (work: Work) => ({
  processedCheckTime: work.checkTime ? dayjs(work.checkTime).format('A hh:mm') : '-',
  processedEndTime: work.endTime ? dayjs(work.endTime).format('A hh:mm') : '-',
  processedCreatedAt: dayjs(work.createdAt).format('MM/DD'),
  processedUpdatedAt: dayjs(work.updatedAt).format('MM/DD'),
});

const Remark = ({ work }: { work: Work }) => (
  <p style={{ padding: '0 16px', textAlign: 'center' }}>{`비고: ${work.remark}`}</p>
);

const WorkList = () => {
  const fakeDataSource: ProcessedWork[] = fakeWorks.map((work) => ({
    ...work,
    ...processWorkDateTimes(work),
    payout: ((work.charge + (work.subsidy || 0)) * (8 / 10)).toFixed(1),
  }));

  return (
    <Table
      dataSource={fakeDataSource}
      columns={columns}
      expandable={{
        expandedRowRender: (work) => <Remark work={work} />,
      }}
      locale={{
        sortTitle: '정렬',
        triggerDesc: '오래된 순 정렬',
        triggerAsc: '최신 순 정렬',
        cancelSort: '처음 상태로 되돌리기',
      }}
      rowKey={(work) => work.id}
      pagination={{ position: ['topRight'] }}
      size="middle"
      bordered
    />
  );
};

export default WorkList;
