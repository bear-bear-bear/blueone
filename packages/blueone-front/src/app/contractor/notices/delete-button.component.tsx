import { useState } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import httpClient from '@/shared/api/axios';
import type { EndPoint, Notice } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type Props = {
  record: Notice;
};
type Response = EndPoint['DELETE /notices/{noticeId}']['responses']['200'];

export default function DeleteButton({ record }: Props) {
  const { message } = App.useApp();
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<Notice[]>('/notices', axiosFetcher);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  const deleteNotice = async () => {
    try {
      await httpClient.delete<Response>(`/notices/${record.id}`);
      const nextNoticeList = noticeList?.filter((notice) => notice.id !== record.id);
      await mutateNoticeList(nextNoticeList);
      message.success('공지사항 삭제 완료');
    } catch (err) {
      setIsPopoverOpen(false);
      throw err;
    }
  };

  return (
    <>
      <Popconfirm
        title="공지사항 삭제"
        open={isPopoverOpen}
        onConfirm={deleteNotice}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined className="!text-red-500" />}
        placement="bottom"
      >
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="!text-red-500"
            onClick={showPopconfirm}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
}
