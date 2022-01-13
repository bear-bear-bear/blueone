import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import qs from 'qs';
import { Global } from '@emotion/react';
import { rangePickerNextMonthSectionHideStyles } from '@components/Admin/content/commonParts/RangePicker';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint, Unpacked } from '@typings';
import DatePicker from './DatePicker';
import AddButton from './AddButton';
import columns from './columns';
import * as S from './styles';

export type DateRange = {
  start: string;
  end: string;
};
export type NoticeList = EndPoint['GET /notice']['responses']['200'];
export type Notice = Unpacked<NoticeList>;
export type ProcessedNotice = Notice & {
  processedCreatedAt: string;
  swrKey: string;
};

const processNoticeCreatedAt = (notice: Notice) => {
  const thisYear = dayjs().year();
  const createdAt = dayjs(notice.createdAt);

  return {
    processedCreatedAt: createdAt.format(createdAt.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
  };
};

const NoticeBoard = () => {
  const today = dayjs();
  const TODAY_YYYY_MM_DD = today.format('YYYY-MM-DD');
  const SEVEN_DAYS_AGO_YYYY_MM_DD = today.subtract(7, 'days').format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRange>({
    start: SEVEN_DAYS_AGO_YYYY_MM_DD,
    end: TODAY_YYYY_MM_DD,
  });
  const swrKey = `/notice?${qs.stringify(dateRange)}`;
  const { data: noticeList } = useSWRImmutable<NoticeList>(swrKey, axiosFetcher, {
    revalidateOnMount: true,
  });

  const dataSource: ProcessedNotice[] | undefined = useMemo(() => {
    if (!noticeList) return undefined;
    return noticeList.map((notice) => ({
      ...notice,
      ...processNoticeCreatedAt(notice),
      swrKey,
    }));
  }, [noticeList, swrKey]);

  if (!noticeList) {
    return (
      <S.SpinnerWrapper>
        <Spin size="default" />
      </S.SpinnerWrapper>
    );
  }
  return (
    <S.Container>
      <Global styles={rangePickerNextMonthSectionHideStyles} />
      <S.TableHeader>
        <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
        <AddButton swrKey={swrKey} />
      </S.TableHeader>
      <Table
        id="noticeBoard"
        dataSource={dataSource}
        columns={columns}
        rowKey={(notice) => notice.id}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {}, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
        })}
        pagination={{ position: ['bottomLeft'] }}
        size="middle"
        bordered
      />
    </S.Container>
  );
};

export default NoticeBoard;
