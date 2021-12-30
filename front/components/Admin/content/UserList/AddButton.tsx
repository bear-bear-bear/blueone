import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { EndPoint } from '@typings';
import AddForm from './AddForm';

export type CreateRequestBody = EndPoint['POST /users']['requestBody'];

const AddButton = () => {
  const [form] = Form.useForm<CreateRequestBody>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, [form]);

  const handleAddIconClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Button type="primary" onClick={handleAddIconClick}>
        기사 등록
      </Button>
      <Modal
        title="기사 등록"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="작성 완료"
        cancelText="취소"
        confirmLoading={submitLoading}
      >
        <AddForm form={form} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
      </Modal>
    </>
  );
};

export default AddButton;
