import { FC, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { EndPoint } from '@/shared/api/types';
import { PackDateRange } from '@/shared/lib/utils/pack-date-range';
import AddForm from './add-form.component';

type Props = {
  swrKey: string;
};
type Request = EndPoint['POST /notices']['requestBody'];
type FormValues = PackDateRange<Request>;

const AddButton: FC<Props> = ({ swrKey }) => {
  const [form] = Form.useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEditIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="default" onClick={handleEditIconClick}>
        등록
      </Button>
      <Modal
        title="공지사항 등록"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="등록"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
      >
        <AddForm form={form} setSubmitLoading={setSubmitLoading} closeModal={closeModal} swrKey={swrKey} />
      </Modal>
    </>
  );
};

export default AddButton;
