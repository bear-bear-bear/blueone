import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button as AntdButton, Checkbox, Form, FormProps, Modal, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { AiOutlinePlus } from 'react-icons/ai';
import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import AddForm from './AddForm';
import type { ProcessedWork } from './index';

type Props = {
  record?: ProcessedWork;
  swrKey?: string;
  Button?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
};

const AddButton = ({ record, swrKey = record?.swrKey, Button }: Props) => {
  const [form] = Form.useForm<WorkAddFormFields>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');
  const [useBooking, setUseBooking] = useState<boolean>(!!record?.bookingDate);

  const reset = useCallback(() => {
    form.resetFields();
    setUseBooking(!!record?.bookingDate);
    setFormValidateTrigger('onFinish');
  }, [form, record?.bookingDate]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    reset();
  }, [reset]);

  const handleAddIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onChangeBookingCheckbox = useCallback((e: CheckboxChangeEvent) => {
    setUseBooking(e.target.checked);
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

      {isModalOpen && (
        <Modal
          title={useBooking ? '업무 예약' : '업무 등록'}
          visible
          onOk={form.submit}
          onCancel={closeModal}
          okText="등록"
          cancelText="취소"
          confirmLoading={submitLoading}
          maskClosable={false}
          footer={[
            <Checkbox
              key="booking"
              checked={useBooking}
              onChange={onChangeBookingCheckbox}
              style={{ float: 'left', padding: '5px 0' }}
            >
              예약
            </Checkbox>,

            <AntdButton key="clear" onClick={reset}>
              초기화
            </AntdButton>,
            <AntdButton key="cancel" onClick={closeModal}>
              취소
            </AntdButton>,
            <AntdButton key="submit" type="primary" onClick={form.submit}>
              등록
            </AntdButton>,
          ]}
        >
          <AddForm
            form={form}
            validateTrigger={formValidateTrigger}
            setValidateTrigger={setFormValidateTrigger}
            swrKey={swrKey}
            prevWork={record}
            setSubmitLoading={setSubmitLoading}
            useBooking={useBooking}
          />
        </Modal>
      )}
    </>
  );
};

export default AddButton;
