import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AddWork } from '@/features/contractor/work/add';
import { EditWork } from '@/features/contractor/work/edit';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteButton from './delete-button.component';
import type { ProcessedWork } from './page';

const columns: ColumnsType<ProcessedWork> = [
  {
    title: '일자',
    dataIndex: 'processedCreatedAt',
    key: 'processedCreatedAt',
    align: 'center',
    sorter: {
      compare: (a, b) => +dayjs(a.createdAt).toDate() - +dayjs(b.createdAt).toDate(),
    },
    width: 60,
  },
  {
    title: '예약 일시',
    dataIndex: 'processedBookingDate',
    key: 'processedBookingDate',
    align: 'center',
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
    dataIndex: 'processedCheckTime',
    key: 'processedCheckTime',
    align: 'center',
    width: 90,
  },
  {
    title: '완료',
    dataIndex: 'processedEndTime',
    key: 'processedEndTime',
    align: 'center',
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
      const AddButton = (
        <AddWork
          initialValues={record}
          trigger={({ openModal, isPending }) => (
            <Tooltip title="추가">
              <Button type="text" size="small" icon={<PlusOutlined />} onClick={openModal} loading={isPending} />
            </Tooltip>
          )}
        />
      );

      const EditButton = (
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

      if (!record.endTime) {
        return (
          <>
            {EditButton}
            {AddButton}
            <DeleteButton record={record} />
          </>
        );
      }
      const TODAY_START_MS = dayjs().startOf('d').valueOf();
      const isDoneAtToday = +new Date(record.endTime) > TODAY_START_MS;
      if (isDoneAtToday) {
        return (
          <>
            {EditButton}
            {AddButton}
          </>
        );
      }
      return AddButton;
    },
    width: 90,
  },
];

export default columns;
