import { ReactElement, useState } from 'react';
import { Button, Checkbox, Form, Modal, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { AiOutlinePlus } from 'react-icons/ai';
import type { ProcessedWork } from '@/app/contractor/works/page';
import AddForm, { type WorkAddFormValues } from './add-form.component';

type Props = {
  record?: ProcessedWork;
  swrKey?: string;
  render?: (onClick: () => void) => ReactElement;
};

export default function AddButton({ record, swrKey = record?.swrKey, render }: Props) {
  const [form] = Form.useForm<WorkAddFormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [useBooking, setUseBooking] = useState<boolean>(!!record?.bookingDate);

  const reset = () => {
    form.resetFields();
    setUseBooking(!!record?.bookingDate);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleAddIconClick = () => {
    setIsModalOpen(true);
  };

  const onChangeBookingCheckbox = (e: CheckboxChangeEvent) => {
    setUseBooking(e.target.checked);
  };

  return (
    <>
      {render ? (
        render(handleAddIconClick)
      ) : (
        <Tooltip title="추가">
          <Button type="text" size="small" icon={<AiOutlinePlus />} onClick={handleAddIconClick} />
        </Tooltip>
      )}

      {isModalOpen && (
        <Modal
          title={useBooking ? '업무 예약' : '업무 등록'}
          open
          onOk={form.submit}
          onCancel={closeModal}
          okText="등록"
          cancelText="취소"
          confirmLoading={submitLoading}
          maskClosable={false}
          footer={[
            <Checkbox key="booking" checked={useBooking} onChange={onChangeBookingCheckbox} className="float-left py-1">
              예약
            </Checkbox>,

            <Button key="clear" onClick={reset}>
              초기화
            </Button>,
            <Button key="cancel" onClick={closeModal}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={form.submit}>
              등록
            </Button>,
          ]}
        >
          <AddForm
            form={form}
            swrKey={swrKey}
            prevWork={record}
            setSubmitLoading={setSubmitLoading}
            useBooking={useBooking}
          />
        </Modal>
      )}
    </>
  );
}
