import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AddWork } from '@/features/contractor/work/add';
import { EditWork } from '@/features/contractor/work/edit';
import { RemoveWork } from '@/features/contractor/work/remove';
import { ItemOf } from '@/shared/api/types';
import { GetListResponse } from '@/shared/api/types/works';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

type Item = ItemOf<GetListResponse>;

const columns: ColumnsType<Item> = [
  {
    title: '일자',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (_, record) => processDate(record.createdAt),
    sorter: {
      compare: (a, b) => +dayjs(a.createdAt).toDate() - +dayjs(b.createdAt).toDate(),
    },
    width: 60,
  },
  {
    title: '예약 일시',
    dataIndex: 'bookingDate',
    key: 'bookingDate',
    align: 'center',
    render: (_, record) => processDate(record.bookingDate, true),
    sorter: {
      compare: (a, b) => +dayjs(a.bookingDate).toDate() - +dayjs(b.bookingDate).toDate(),
    },
    width: 90,
  },
  {
    title: '출발지',
    dataIndex: 'origin',
    key: 'origin',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '경유지',
    dataIndex: 'waypoint',
    key: 'waypoint',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '도착지',
    dataIndex: 'destination',
    key: 'destination',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '차종',
    dataIndex: 'carModel',
    key: 'carModel',
    align: 'center',
    ellipsis: true,
    width: 100,
  },
  {
    title: '기사',
    dataIndex: 'realname',
    key: 'realname',
    align: 'center',
    render: (_, record) => record.User?.UserInfo.realname,
    width: 80,
  },
  {
    title: '구간지수',
    dataIndex: 'charge',
    key: 'charge',
    align: 'right',
    width: 80,
  },
  {
    title: '할인/할증',
    dataIndex: 'adjustment',
    key: 'adjustment',
    align: 'right',
    width: 80,
  },
  {
    title: '지원지수',
    dataIndex: 'subsidy',
    key: 'subsidy',
    align: 'right',
    width: 80,
  },
  {
    title: '최종지수',
    dataIndex: 'payout',
    key: 'payout',
    align: 'right',
    width: 80,
  },
  {
    title: '확인',
    dataIndex: 'checkTime',
    key: 'checkTime',
    align: 'center',
    render: (_, record) => processTime(record.checkTime, record.createdAt),
    width: 90,
  },
  {
    title: '완료',
    dataIndex: 'endTime',
    key: 'endTime',
    align: 'center',
    render: (_, record) => processTime(record.endTime, record.createdAt),
    sorter: {
      compare: (a, b) => +!!a.endTime - +!!b.endTime,
    },
    width: 90,
  },
  {
    title: '',
    key: 'action',
    align: 'center',
    render: (_, record) => {
      if (!record.endTime) {
        return (
          <>
            {renderEditButton(record)}
            {renderAddButton(record)}
            {renderRemoveButton(record)}
          </>
        );
      }

      if (isCompletedAtToday(record.endTime)) {
        return (
          <>
            {renderEditButton(record)}
            {renderAddButton(record)}
          </>
        );
      }

      return renderAddButton(record);
    },
    width: 90,
  },
];

export default columns;

function renderAddButton(record: Item) {
  return (
    <AddWork
      initialValues={record}
      trigger={({ openModal, isPending }) => (
        <Tooltip title="추가">
          <Button type="text" size="small" icon={<PlusOutlined />} onClick={openModal} loading={isPending} />
        </Tooltip>
      )}
    />
  );
}

function renderEditButton(record: Item) {
  return (
    <EditWork
      id={record.id}
      initialValues={record}
      completed={!!record.endTime}
      trigger={({ openModal, isPending }) => (
        <Tooltip title="수정">
          <Button type="text" size="small" icon={<EditOutlined />} onClick={openModal} loading={isPending} />
        </Tooltip>
      )}
    />
  );
}

function renderRemoveButton(record: Item) {
  return (
    <RemoveWork
      id={record.id}
      trigger={({ openPopConfirm, isPending }) => (
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="!text-red-500"
            onClick={openPopConfirm}
            loading={isPending}
          />
        </Tooltip>
      )}
    />
  );
}

function isCompletedAtToday(endTime: string) {
  const TODAY_START_MS = dayjs().startOf('d').valueOf();
  return +new Date(endTime) > TODAY_START_MS;
}

function processTime(targetTime: string | undefined, createdAt: Item['createdAt']): string {
  if (!targetTime) return '-';

  const day = dayjs(targetTime);
  const isCreatedDay = day.startOf('day').isSame(dayjs(createdAt).startOf('day'));

  return day.format(isCreatedDay ? 'HH:mm' : 'MM/DD_HH:mm');
}

function processDate(targetDate?: string, withTime?: boolean): string {
  if (!targetDate) return '-';

  const day = dayjs(targetDate);
  const inThisYear = day.year() === dayjs().year();

  const formatFront = inThisYear ? 'MM/DD' : 'YYYY/MM/DD';
  const formatBack = withTime ? ' HH:00' : '';

  return day.format(formatFront + formatBack);
}