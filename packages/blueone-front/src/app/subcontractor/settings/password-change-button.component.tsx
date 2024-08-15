import { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { EndPoint } from '@/shared/api/types';
import PasswordChangeForm from './password-change-form.component';

type Request = EndPoint['POST /user/password']['requestBody'];

export default function PasswordChangeButton() {
  const [form] = Form.useForm<Request>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="text" onClick={handleButtonClick} className="text-start p-0" block>
        비밀번호 변경
      </Button>
      <Modal
        title="비밀번호 변경"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="변경"
        cancelText="취소"
        okButtonProps={{ size: 'large' }}
        cancelButtonProps={{ size: 'large' }}
        confirmLoading={loading}
        centered
      >
        <PasswordChangeForm form={form} closeModal={closeModal} setSubmitLoading={setLoading} />
      </Modal>
    </>
  );
}
