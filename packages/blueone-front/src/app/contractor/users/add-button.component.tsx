import { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { EndPoint } from '@/shared/api/types';
import AddForm from './add-form.component';

type Request = EndPoint['POST /users']['requestBody'];

export default function AddButton() {
  const [form] = Form.useForm<Request>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={handleAddIconClick}>
        등록
      </Button>
      <Modal
        title="기사 등록"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="등록"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <AddForm form={form} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
      </Modal>
    </>
  );
}
