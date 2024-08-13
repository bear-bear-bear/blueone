import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { EndPoint } from '@/typings';
import PasswordChangeForm from './PasswordChangeForm';

type RequestBody = EndPoint['POST /user/password']['requestBody'];

const PasswordChangeButton = () => {
  const [form] = Form.useForm<RequestBody>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    form.resetFields();
    setIsModalOpen(false);
  }, [form]);

  const handleButtonClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Button type="text" onClick={handleButtonClick} style={{ textAlign: 'start', padding: 0 }} block>
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
};

export default PasswordChangeButton;
