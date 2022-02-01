import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, Modal } from 'antd';
import type { EndPoint } from '@typings';
import AddForm from './AddForm';

export type CreateRequestBody = EndPoint['POST /users']['requestBody'];

const AddButton = () => {
  const [form] = Form.useForm<CreateRequestBody>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleAddIconClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Button type="primary" onClick={handleAddIconClick}>
        등록
      </Button>
      <Modal
        title="기사 등록"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="등록"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <AddForm
          form={form}
          validateTrigger={formValidateTrigger}
          setValidateTrigger={setFormValidateTrigger}
          closeModal={closeModal}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default AddButton;
