import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button as AntdButton, Form, FormProps, Modal, Tooltip } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import type { WorkAddAntdFormFields } from '@components/Admin/content/WorkAddFormForMobile';
import AddForm from './AddForm';
import type { ProcessedWork } from './index';

type Props = {
  record?: ProcessedWork;
  swrKey?: string;
  Button?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
};

const AddButton = ({ record, swrKey = record?.swrKey, Button }: Props) => {
  const [form] = Form.useForm<WorkAddAntdFormFields>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleAddIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {Button ? (
        <Button onClick={handleAddIconClick} />
      ) : (
        <Tooltip title="추가">
          <AntdButton type="text" size="small" icon={<AiOutlinePlus />} onClick={handleAddIconClick} />
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
          swrKey={swrKey}
          prevWork={record}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default AddButton;