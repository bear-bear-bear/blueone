import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, Modal, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { WorkAddAntdFormFields } from '@components/Admin/content/WorkAddFormForMobile';
import EditForm from './EditForm';
import type { ProcessedWork } from './index';

type Props = {
  record: ProcessedWork;
};

const EditButton = ({ record }: Props) => {
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
      <Tooltip title="수정">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEditIconClick} />
      </Tooltip>
      <Modal
        title="업무 수정"
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
          prevWork={record}
          closeModal={closeModal}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default EditButton;
