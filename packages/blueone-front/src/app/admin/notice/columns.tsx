import { ReactNode } from 'react';
import { ColumnsType } from 'antd/es/table';
import type { ProcessedNotice } from '@/app/admin/notice/page';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

// row onclick expand 를 특정 td 에서 실행하지 않기 위한 escape
// (style 은 row 의 'cursor: pointer' 를 해당 td 에서 완전히 무효화하기 위한 임시 escape)
const PropagationStopper = ({ children }: { children: ReactNode }) => (
  <div onClick={(e) => e.stopPropagation()} style={{ padding: '0.66rem 0', cursor: 'initial' }}>
    {children}
  </div>
);

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
    className: 'notice-board__content-row',
  },
  {
    title: '기간',
    dataIndex: 'dateRange',
    key: 'dateRange',
    width: 120,
    render: (_, record) => `${record.processedStartDate} - ${record.processedEndDate}`,
  },
  {
    title: '',
    key: 'action',
    align: 'center',
    render: (_, record) => (
      <PropagationStopper>
        <EditButton record={record} />
        <DeleteButton record={record} />
      </PropagationStopper>
    ),
    width: 80,
    className: 'notice-board__non-padding-td',
  },
];

export default columns;
