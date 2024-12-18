import { ReactElement, useState } from 'react';
import { Form, Input, App, Modal, InputNumber, Checkbox, Button, Select } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import { BookingDatePicker, useBookingDate } from '@/entities/work';
import { PaymentType } from '@/shared/api/types';
import { AddRequest } from '@/shared/api/types/works';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import omit from '@/shared/lib/utils/omit';
import { SubcontractorSelector } from '@/widgets/subcontractor-selector';
import useAddWork from '../api/use-add-work.mutation';

type TriggerProps = {
  openModal: () => void;
  isPending: boolean;
};
type Props = {
  initialValues?: Partial<AddRequest>;
  trigger: (props: TriggerProps) => ReactElement;
};

export default function AddWork({ initialValues = { paymentType: PaymentType.DIRECT }, trigger }: Props) {
  const [form] = Form.useForm<AddRequest>();
  const { message } = App.useApp();
  const { mutate: addWork, isPending } = useAddWork();
  const [useBooking, setUseBooking] = useState(!!initialValues?.bookingDate);
  const [bookingDate, setBookingDate, resetBookingDate] = useBookingDate(initialValues?.bookingDate);
  const [pickedUserId, setPickedUserId] = useState(initialValues?.userId);

  const initialize = () => {
    form.setFieldsValue(omit(initialValues, ['bookingDate', 'userId'])); // omit controlled values
    setUseBooking(!!initialValues?.bookingDate);
    setPickedUserId(initialValues?.userId);
    resetBookingDate();
  };
  const { open, onOpen, onClose } = useDisclosure({
    onOpen: initialize,
  });

  const onFormFinish = (values: AddRequest) => {
    const request: AddRequest = {
      ...values,
      userId: pickedUserId,
      remark: values.remark?.trim() || undefined,
      bookingDate: useBooking ? bookingDate.format() : undefined,
    };

    addWork(request, {
      onSuccess: () => {
        message.success('업무 등록 완료');
        // onClose(); - NOTE: 사용자 편의상 등록 완료 후 닫지 않음 (추가 등록 등을 위해)
      },
    });
  };

  return (
    <>
      {trigger({
        openModal: onOpen,
        isPending,
      })}

      <Modal
        title={useBooking ? '업무 예약' : '업무 등록'}
        open={open}
        onOk={form.submit}
        onCancel={onClose}
        okText="등록"
        cancelText="취소"
        confirmLoading={isPending}
        maskClosable={false}
        footer={[
          <Checkbox
            key="booking"
            checked={useBooking}
            onChange={(e) => setUseBooking(e.target.checked)}
            className="float-left py-1"
          >
            예약
          </Checkbox>,

          <Button key="clear" onClick={initialize}>
            초기화
          </Button>,
          <Button key="cancel" onClick={onClose}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            등록
          </Button>,
        ]}
      >
        <Form<AddRequest>
          form={form}
          onFinish={onFormFinish}
          validateMessages={validateMessages}
          size="middle"
          {...layout}
        >
          <Form.Item name="origin" label="출발지" rules={[{ required: true }, { type: 'string', max: 255 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="waypoint" label="경유지" rules={[{ type: 'string', max: 255 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="destination" label="도착지" rules={[{ required: true }, { type: 'string', max: 255 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="carModel" label="차종" rules={[{ required: true }, { type: 'string', max: 255 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="paymentType" label="지급유형" rules={[{ required: true }]}>
            <Select<PaymentType> allowClear={false} style={{ width: 90 }}>
              <Select.Option value={PaymentType.DIRECT}>직불</Select.Option>
              <Select.Option value={PaymentType.CASH}>현불</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="charge"
            label="구간지수"
            tooltip="단위: 1000"
            rules={[{ type: 'number', min: 0, max: 16777216, required: true }]}
          >
            <InputNumber autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="adjustment"
            label="할인/할증"
            tooltip="단위: 1000"
            rules={[{ type: 'number', min: -16777215, max: 16777216 }]}
          >
            <InputNumber autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="subsidy"
            label="지원"
            tooltip="단위: 1000"
            rules={[{ type: 'number', min: 0, max: 16777216 }]}
          >
            <InputNumber autoComplete="off" />
          </Form.Item>
          <Form.Item label="기사" tooltip="나중에 등록할 수도 있습니다.">
            <SubcontractorSelector
              value={pickedUserId}
              onChange={setPickedUserId}
              placeholder="업무를 배정받을 기사 선택"
            />
          </Form.Item>
          <Form.Item name="remark" label="비고">
            <Input.TextArea autoComplete="off" />
          </Form.Item>

          {useBooking && (
            <Form.Item label="예약일시" required>
              <BookingDatePicker date={bookingDate} setDate={setBookingDate} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages = {
  required: '필수 입력 값입니다.',
  types: {
    number: '숫자 형식이여야 합니다.',
  },
  number: {
    min: '${min}보다 커야합니다.',
    max: '${max}보다 작아야 합니다.',
  },
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};
