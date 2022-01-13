import { ColumnsType } from 'antd/es/table';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import type { ProcessedNotice } from './index';

const columns: ColumnsType<ProcessedNotice> = [
  {
    title: '일자',
    dataIndex: 'processedCreatedAt',
    key: 'processedCreatedAt',
    align: 'center',
    sorter: {
      compare: (a, b) => +(new Date(b.createdAt) || 0) - +(new Date(a.createdAt) || 0),
    },
    width: 80,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '',
    key: 'action',
    align: 'center',
    render: (_, record) => (
      <>
        <EditButton record={record} />
        <DeleteButton record={record} />
      </>
    ),
    width: 80,
  },
];

export default columns;
