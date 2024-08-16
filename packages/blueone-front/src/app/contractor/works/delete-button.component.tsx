'use client';
import { useState } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { FullWorks, ProcessedWork } from '@/app/contractor/works/page';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type Response = EndPoint['DELETE /works/{workId}']['responses']['200'];

type Props = {
  record: ProcessedWork;
};

export default function DeleteButton({ record }: Props) {
  const { message } = App.useApp();
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(record.swrKey, axiosFetcher);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  const deleteWork = async () => {
    try {
      await httpClient.delete<Response>(`/works/${record.id}`);
      const nextWorks = works?.filter((work) => work.id !== record.id);
      await mutateWorks(nextWorks);
      message.success('업무 삭제 완료');
    } catch (err) {
      setIsPopoverOpen(false);
      message.error('삭제에 실패했습니다.');
      throw err;
    }
  };

  return (
    <Popconfirm
      title="업무 완전히 삭제"
      open={isPopoverOpen}
      onConfirm={deleteWork}
      okText="삭제"
      okButtonProps={{ danger: true }}
      onCancel={handleCancel}
      cancelText="취소"
      icon={<QuestionCircleOutlined className="!text-red-500" />}
      placement="bottom"
    >
      <Tooltip title="삭제">
        <Button type="text" size="small" icon={<DeleteOutlined />} className="!text-red-500" onClick={showPopconfirm} />
      </Tooltip>
    </Popconfirm>
  );
}
