import { useMemo } from 'react';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { axiosFetcher } from '@utils/swr';
import { Spin, Table } from 'antd';
import { SnippetsOutlined } from '@ant-design/icons';
import { Global } from '@emotion/react';
import type { EndPoint, UserInfo, Unpacked } from '@typings';
import columns from './columns';
import * as S from './styles';

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
};

const processWorkDateTimes = (work: FullWork) => ({
  processedCheckTime: work.checkTime ? dayjs(work.checkTime).format('A hh:mm') : '-',
  processedEndTime: work.endTime ? dayjs(work.endTime).format('A hh:mm') : '-',
  processedCreatedAt: dayjs(work.createdAt).format('MM/DD'),
  processedUpdatedAt: dayjs(work.updatedAt).format('MM/DD'),
});

const Remark = ({ work }: { work: ProcessedWork }) => (
  <S.Remark>
    <span>비고:</span>
    &lt;
    {work.remark ?? '-'}
  </S.Remark>
);

// TODO: 확인과 완료 check box 로 work 필터링 하는 기능 작성
const WorkTable = () => {
  const TODAY = new Date().setHours(0, 0, 0, 0);
  const { data: works } = useSWR<FullWorks>('/works', axiosFetcher, {
    refreshInterval: 30 * 1000,
  });

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works.map((work) => ({
      ...work,
      ...processWorkDateTimes(work),
      payout: ((work.charge + (work.subsidy || 0)) * (8 / 10)).toFixed(1),
      realname: work.User?.UserInfo.realname,
      isDone: work.endTime !== null || +new Date(work.createdAt) < TODAY,
    }));
  }, [works, TODAY]);

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
    </>
  );
};

export default WorkTable;
