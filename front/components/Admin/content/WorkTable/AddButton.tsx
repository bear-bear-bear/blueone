import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button as AntdButton, Form, FormProps, Modal, Tooltip } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import type { WorkAddAntdFormFields } from '@components/Admin/content/WorkAddForm';
import AddForm from './AddForm';
import type { ProcessedWork } from './index';

type Props = {
  record?: ProcessedWork;
  Button?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
};

const AddButton = ({ record, Button }: Props) => {
  const [form] = Form.useForm<WorkAddAntdFormFields>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {Button ? (
        <Button onClick={handleEditIconClick} />
      ) : (
        <Tooltip title="추가">
          <AntdButton type="text" size="small" icon={<AiOutlinePlus />} onClick={handleEditIconClick} />
        </Tooltip>
      )}
      <Modal
        title="업무 등록"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="등록"
        cancelText="취소"
        confirmLoading={submitLoading}
      >
        <AddForm
          form={form}
          validateTrigger={formValidateTrigger}
          setValidateTrigger={setFormValidateTrigger}
          prevWork={record}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default AddButton;
