import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint, Unpacked } from '@typings';
import AddButton from './AddButton';
import columns from './columns';
import * as S from './styles';

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
  const { data: noticeList } = useSWRImmutable<NoticeList>('/notice', axiosFetcher, {
    revalidateOnMount: true,
  });

  const dataSource: ProcessedNotice[] | undefined = useMemo(() => {
    if (!noticeList) return undefined;
    return noticeList.map((notice) => ({
      ...notice,
      ...processNoticeCreatedAt(notice),
      swrKey: '',
    }));
  }, [noticeList]);

  if (!noticeList) {
    return (
      <S.SpinnerWrapper>
        <Spin size="default" />
      </S.SpinnerWrapper>
    );
  }
  return (
    <S.Container>
      <S.TableHeader>
        <AddButton />
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
