import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, Modal, Tooltip } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import type { WorkAddAntdFormFields } from '@components/Admin/content/WorkAddForm';
import AddForm from './AddForm';
import type { ProcessedWork } from './index';

type Props = {
  record?: ProcessedWork;
};

const AddButton = ({ record }: Props) => {
  const [form] = Form.useForm<WorkAddAntdFormFields>();
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
      <Tooltip title="이 업무 기반으로 등록">
        <Button type="text" size="small" icon={<AiOutlinePlus />} onClick={handleEditIconClick} />
      </Tooltip>
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
