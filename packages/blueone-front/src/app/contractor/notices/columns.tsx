import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditNotice } from '@/features/contractor/notice/edit';
import { Notice } from '@/shared/api/types';
import dayjs from '@/shared/lib/utils/dayjs';
import { packDateRange } from '@/shared/lib/utils/pack-date-range';
import pick from '@/shared/lib/utils/pick';
import { EditOutlined } from '@ant-design/icons';
import DeleteButton from './delete-button.component';

const columns: ColumnsType<Notice> = [
  {
    title: '일자',
    dataIndex: 'createdAt',
    key: 'createdAt',
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
    render: (_, record) => `${record.startDate} - ${record.endDate}`,
  },
  {
    title: '',
    key: 'action',
    align: 'center',
    render: (_, record) => {
      return (
        // row onclick expand 를 특정 td 에서 실행하지 않기 위해 stopPropagation 적용
        <div onClick={(e) => e.stopPropagation()} className="py-2 cursor-default">
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
        </div>
      );
    },
    width: 80,
    className: '!p-0',
  },
];

export default columns;

export function preFormatDates(notice: Notice) {
  const thisYear = dayjs().year();
  const createdAt = dayjs(notice.createdAt);
  const startDate = dayjs(notice.startDate);
  const endDate = dayjs(notice.endDate);

  return {
    ...notice,
    createdAt: createdAt.format(createdAt.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
    startDate: startDate.format(startDate.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
    endDate: endDate.format(endDate.year() === thisYear ? 'MM/DD' : 'YYYY/MM/DD'),
  };
}
