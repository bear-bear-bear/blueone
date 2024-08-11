import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import type { DatesToRange, EndPoint } from '@typings';
import AddForm from './AddForm';

type Props = {
  swrKey: string;
};
type RequestBody = EndPoint['POST /notice']['requestBody'];
type FormValues = DatesToRange<RequestBody>;

const AddButton: FC<Props> = ({ swrKey }) => {
  const [form] = Form.useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, [form]);

  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

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
