import { ReactNode } from 'react';
import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditNotice } from '@/features/contractor/notice/edit';
import { packDateRange } from '@/shared/lib/utils/pack-date-range';
import pick from '@/shared/lib/utils/pick';
import { EditOutlined } from '@ant-design/icons';
import DeleteButton from './delete-button.component';
import type { ProcessedNotice } from './page';

// row onclick expand 를 특정 td 에서 실행하지 않기 위한 escape
// (style 은 row 의 'cursor: pointer' 를 해당 td 에서 완전히 무효화하기 위한 임시 escape)
const PropagationStopper = ({ children }: { children: ReactNode }) => (
  <div onClick={(e) => e.stopPropagation()} className="py-2 cursor-default">
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
    render: (_, record) => {
      return (
        <PropagationStopper>
          <EditNotice
            id={record.id}
            initialValues={pick(packDateRange(record), ['title', 'content', 'dateRange'])}
            trigger={({ openModal, isPending }) => (
              <Tooltip title="수정">
                <Button type="text" size="small" icon={<EditOutlined />} onClick={openModal} loading={isPending} />
              </Tooltip>
            )}
          />
          <DeleteButton record={record} />
        </PropagationStopper>
      );
    },
    width: 80,
    className: '!p-0',
  },
];

export default columns;
