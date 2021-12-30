import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, Modal, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './EditForm';
import type { Fields } from '@components/Admin/Content/WorkAddForm';
import type { ProcessedWork } from './index';

type Props = {
  record: ProcessedWork;
};

const EditButton = ({ record }: Props) => {
  const [form] = Form.useForm<Fields>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, []);

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
        okText="수정 완료"
        cancelText="취소"
        confirmLoading={submitLoading}
      >
        <EditForm form={form} prevWork={record} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
      </Modal>
    </>
  );
};

export default EditButton;
