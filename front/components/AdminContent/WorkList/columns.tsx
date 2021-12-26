import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import Link from 'next/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns: ColumnsType<ProcessedWork> = [
  {
    title: '일자',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
  },
  {
    title: '경로',
    align: 'center',
    children: [
      {
        title: '출발지',
        dataIndex: 'origin',
        key: 'origin',
        align: 'center',
      },
      {
        title: '경유지',
        dataIndex: 'waypoint',
        key: 'waypoint',
        align: 'center',
      },
      {
        title: '도착지',
        dataIndex: 'destination',
        key: 'destination',
        align: 'center',
      },
    ],
  },
  {
    title: '차종',
    dataIndex: 'carModel',
    key: 'carModel',
    align: 'center',
  },
  {
    title: '기사',
    dataIndex: 'userId',
    key: 'userId',
    align: 'center',
  },
  {
    title: '요금 (단위: 1000)',
    align: 'center',

    children: [
      {
        title: '구간지수',
        dataIndex: 'charge',
        key: 'charge',
        align: 'center',
      },
      {
        title: '지원지수',
        dataIndex: 'subsidy',
        key: 'subsidy',
        align: 'center',
      },
      {
        title: '수수료',
        dataIndex: 'fee',
        key: 'fee',
        align: 'center',
      },
      {
        title: '지불금',
        dataIndex: 'payout',
        key: 'payout',
        align: 'center',
      },
    ],
  },
  {
    title: '체크됨',
    dataIndex: 'checkTime',
    key: 'checkTime',
    align: 'center',
  },
  {
    title: '완료됨',
    dataIndex: 'endTime',
    key: 'endTime',
    align: 'center',
  },
  {
    title: '',
    key: 'action',
    align: 'center',
    render: () => (
      <Space size="small">
        <Link href="/">
          <a>
            <EditOutlined title="수정" />
          </a>
        </Link>
        <Link href="/">
          <a>
            <DeleteOutlined title="삭제" />
          </a>
        </Link>
      </Space>
    ),
  },
];

export default columns;
