import { useState } from 'react';
import { Button, Form, Modal, Tooltip } from 'antd';
import { EndPoint } from '@/shared/api/types';
import { PackDateRange } from '@/shared/lib/utils/pack-date-range';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './edit-form.component';
import type { ProcessedNotice } from './page';

type Request = EndPoint['PUT /notices/{noticeId}']['requestBody'];
type FormValues = PackDateRange<Request>;
type Props = {
  record: ProcessedNotice;
};

export default function EditButton({ record }: Props) {
  const [form] = Form.useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEditIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Tooltip title="수정">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEditIconClick} />
      </Tooltip>
      <Modal
        title="공지사항 수정"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="수정"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <EditForm form={form} prevNotice={record} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
      </Modal>
    </>
  );
}
