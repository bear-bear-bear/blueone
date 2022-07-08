import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import AddButton from './AddButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import type { ProcessedWork } from './index';

const columns: ColumnsType<ProcessedWork> = [
  {
    title: '일자',
    dataIndex: 'processedCreatedAt',
    key: 'processedCreatedAt',
    align: 'center',
    render: (_, { processedBookingDate, processedCreatedAt }) => {
      if (processedBookingDate && processedBookingDate !== '-') {
        return processedBookingDate;
      }
      return processedCreatedAt;
    },
    sorter: {
      compare: (a, b) => +(new Date(b.createdAt) || 0) - +(new Date(a.createdAt) || 0),
    },
    width: 60,
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
    title: '지원지수',
    dataIndex: 'subsidy',
    key: 'subsidy',
    align: 'right',
    width: 80,
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
    width: 90,
  },
];

export default columns;
