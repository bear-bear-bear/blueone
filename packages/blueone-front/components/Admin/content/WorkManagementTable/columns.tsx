import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import type { ProcessedWork } from './index';

const columns: ColumnsType<ProcessedWork> = [
  {
    title: '일자',
    dataIndex: 'processedCreatedAt',
    key: 'processedCreatedAt',
    align: 'center',
    sorter: {
      compare: (a, b) => +dayjs(a.createdAt).toDate() - +dayjs(b.createdAt).toDate(),
    },
  },
  {
    title: '예약 일시',
    dataIndex: 'processedBookingDate',
    key: 'processedBookingDate',
    align: 'center',
    sorter: {
      compare: (a, b) => +dayjs(a.bookingDate).toDate() - +dayjs(b.bookingDate).toDate(),
    },
  },
  {
    title: '출발지',
    dataIndex: 'origin',
    key: 'origin',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '경유지',
    dataIndex: 'waypoint',
    key: 'waypoint',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '도착지',
    dataIndex: 'destination',
    key: 'destination',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '차종',
    dataIndex: 'carModel',
    key: 'carModel',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '기사',
    dataIndex: 'realname',
    key: 'realname',
    align: 'center',
  },
  {
    title: '구간지수',
    dataIndex: 'charge',
    key: 'charge',
    align: 'right',
  },
  {
    title: '지원지수',
    dataIndex: 'subsidy',
    key: 'subsidy',
    align: 'right',
    render: (_, record) => {
      const subsidy = record.subsidy ?? 0;

      if (record.penalty) {
        return (
          <Tooltip title="패널티">
            <p style={{ color: 'red', fontWeight: 500 }}>{subsidy}</p>
          </Tooltip>
        );
      }

      if (subsidy < 0) {
        return <p style={{ color: 'red', fontWeight: 500 }}>{subsidy}</p>;
      }

      return subsidy || null;
    },
  },
  {
    title: '최종지수',
    dataIndex: 'payout',
    key: 'payout',
    align: 'right',
  },
  {
    title: '확인',
    dataIndex: 'processedCheckTime',
    key: 'processedCheckTime',
    align: 'center',
  },
  {
    title: '완료',
    dataIndex: 'processedEndTime',
    key: 'processedEndTime',
    align: 'center',
    sorter: {
      compare: (a, b) => +!!a.endTime - +!!b.endTime,
    },
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => {
      if (record.endTime === null) {
        return (
          <>
            <EditButton record={record} />
            <AddButton record={record} />
            <DeleteButton record={record} />
          </>
        );
      }
      const TODAY_START_MS = dayjs().startOf('d').valueOf();
      const isDoneAtToday = +new Date(record.endTime) > TODAY_START_MS;
      if (isDoneAtToday) {
        return (
          <>
            <EditButton record={record} />
            <AddButton record={record} />
          </>
        );
      }
      return <AddButton record={record} />;
    },
  },
];

export default columns;
