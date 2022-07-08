import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button as AntdButton, Checkbox, Form, FormProps, Modal, Switch, Tooltip } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
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
  const [isBooking, setIsBooking] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleAddIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onChangeBookingCheckbox = useCallback((e: CheckboxChangeEvent) => {
    setIsBooking(e.target.checked);
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
        title={isBooking ? '업무 예약' : '업무 등록'}
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={closeModal}
        okText="등록"
        cancelText="취소"
        confirmLoading={submitLoading}
        maskClosable={false}
        footer={[
          <Checkbox key="booking" onChange={onChangeBookingCheckbox} style={{ float: 'left', padding: '5px 0' }}>
            예약
          </Checkbox>,

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
          isBooking={isBooking}
        />
      </Modal>
    </>
  );
};

export default AddButton;
