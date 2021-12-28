import React, { useMemo } from 'react';
import useSWR from 'swr';
import { axiosFetcher } from '@utils/swr';
import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { Global } from '@emotion/react';
import { globalCSS } from '@components/AdminContent/WorkList/styles';
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
};

const processWorkDateTimes = (work: FullWork) => ({
  processedCheckTime: work.checkTime ? dayjs(work.checkTime).format('A hh:mm') : '-',
  processedEndTime: work.endTime ? dayjs(work.endTime).format('A hh:mm') : '-',
  processedCreatedAt: dayjs(work.createdAt).format('MM/DD'),
  processedUpdatedAt: dayjs(work.updatedAt).format('MM/DD'),
});

const Remark = ({ work }: { work: FullWork }) => (
  <p style={{ padding: '0 16px', textAlign: 'center' }}>{work.remark ? `비고: ${work.remark}` : '-'}</p>
);

const WorkList = () => {
  const { data: works } = useSWR<FullWorks>('/works', axiosFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works.map((work) => ({
      ...work,
      ...processWorkDateTimes(work),
      payout: ((work.charge + (work.subsidy || 0)) * (8 / 10)).toFixed(1),
      realname: work.User?.UserInfo.realname,
    }));
  }, [works]);

  if (!dataSource) {
    return (
      <S.SpinnerWrapper>
        <Spin size="default" />
      </S.SpinnerWrapper>
    );
  }
  return (
    <>
      <Global styles={globalCSS} />
      <Table
        id="workListTable"
        dataSource={dataSource}
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
    </>
  );
};

export default WorkList;
