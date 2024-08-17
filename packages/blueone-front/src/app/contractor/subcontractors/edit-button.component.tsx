import { useState } from 'react';
import { Button, Form, Modal, Tooltip } from 'antd';
import type { FullUser } from '@/app/contractor/subcontractors/page';
import type { EndPoint } from '@/shared/api/types';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './edit-form.component';

export type UpdateRequest = EndPoint['PUT /users/{userId}']['requestBody'];

type Props = {
  user: FullUser;
};

export default function EditButton({ user }: Props) {
  const [form] = Form.useForm<UpdateRequest>();
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
        title="기사 정보 수정"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="수정"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <EditForm form={form} prevUser={user} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
      </Modal>
    </>
  );
}
