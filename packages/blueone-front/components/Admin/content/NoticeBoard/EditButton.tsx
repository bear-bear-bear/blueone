import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, Modal, Tooltip } from 'antd';
import { DatesToRange, EndPoint } from '@typings';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './EditForm';
import type { ProcessedNotice } from './index';

type RequestBody = EndPoint['PUT /notice/{noticeId}']['requestBody'];
type FormValues = DatesToRange<RequestBody>;
type Props = {
  record: ProcessedNotice;
};

const EditButton = ({ record }: Props) => {
  const [form] = Form.useForm<FormValues>();
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
        title="공지사항 수정"
        open={isModalOpen}
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
          prevNotice={record}
          closeModal={closeModal}
          setSubmitLoading={setSubmitLoading}
        />
      </Modal>
    </>
  );
};

export default EditButton;
