import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, Modal, Tooltip } from 'antd';
import type { EndPoint } from '@typings';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './EditForm';
import type { FullUser } from './index';

type Props = {
  user: FullUser;
};
export type UpdateRequestBody = EndPoint['PUT /users/{userId}']['requestBody'];

const EditButton = ({ user }: Props) => {
  const [form] = Form.useForm<UpdateRequestBody>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleEditIconClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Tooltip title="수정">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEditIconClick} />
      </Tooltip>
      <Modal
        title="기사 정보 수정"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="수정"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <EditForm
          form={form}
          validateTrigger={formValidateTrigger}
          setValidateTrigger={setFormValidateTrigger}
          prevUser={user}
          closeModal={closeModal}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default EditButton;
