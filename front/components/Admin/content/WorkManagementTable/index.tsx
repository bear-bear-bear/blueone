import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import qs from 'qs';
import useSWR from 'swr';
import { Button, Checkbox, Spin, Table } from 'antd';
import { SnippetsOutlined } from '@ant-design/icons';
import { Global } from '@emotion/react';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint, UserInfo, Unpacked, User } from '@typings';
import TotalFee from './TotalFee';
import DatePicker from './DatePicker';
import UserPicker from './UserPicker';
import AddButton from './AddButton';
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
  const today = dayjs();
  const TODAY_START_MS = today.startOf('d').valueOf();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const THREE_DAYS_AGO_YYYY_MM_DD = today.subtract(3, 'days').format('YYYY-MM-DD');

  const [pickedUserId, setPickedUserId] = useState<User['id'] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: THREE_DAYS_AGO_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/works?${qs.stringify(dateRange)}`;
  const { data: works } = useSWR<FullWorks>(swrKey, axiosFetcher, {
    refreshInterval: 30 * 1000,
  });
  const [isVisiblePastDoneWork, setIsVisiblePastDoneWork] = useState<boolean>(false);
  const [isShowTotalFee, setIsShowTotalFee] = useState<boolean>(false);

  const dataSource: ProcessedWork[] | undefined = useMemo(() => {
    if (!works) return undefined;
    return works
      .filter((work) => {
        const isDoneAtPast = work.endTime !== null && +new Date(work.endTime) < TODAY_START_MS;
        return isVisiblePastDoneWork || !isDoneAtPast;
      })
      .filter((work) => {
        if (pickedUserId === null) return true;
        return work.UserId === pickedUserId;
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
  }, [works, TODAY_START_MS, swrKey, isVisiblePastDoneWork, pickedUserId]);

  const handleChangeVisiblePastDoneWorkCheckbox = () => {
    setIsVisiblePastDoneWork((prev) => !prev);
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
          <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
          <UserPicker pickedUserId={pickedUserId} setPickedUserId={setPickedUserId} />
          <Checkbox onChange={handleChangeVisiblePastDoneWorkCheckbox}>과거 목록</Checkbox>
          <Checkbox onChange={handleChangeShowTotalFeeCheckbox}>지수 합계</Checkbox>
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
        summary={() => {
          if (!isShowTotalFee) return null;
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length + 1}>
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
