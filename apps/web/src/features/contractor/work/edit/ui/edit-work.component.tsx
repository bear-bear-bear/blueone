import { ReactElement, useState } from 'react';
import { Form, Input, App, Modal, Popconfirm, Button, InputNumber } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import { BookingDatePicker, useBookingDate } from '@/entities/work';
import { Work } from '@/shared/api/types';
import { EditRequest } from '@/shared/api/types/works';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import omit from '@/shared/lib/utils/omit';
import { SubcontractorSelector } from '@/widgets/subcontractor-selector';
import useEditWork from '../api/use-edit-work.mutation';
import useForceActivateBookedWork from '../api/use-force-activate-booked-work.mutation';
import useForceCompleteWork from '../api/use-force-complete-work.mutaion';

type FormValues = Omit<EditRequest, 'workId'>;

type TriggerProps = {
  openModal: () => void;
  isPending: boolean;
};
type Props = {
  id: Work['id'];
  completed: boolean;
  initialValues: FormValues;
  trigger: (props: TriggerProps) => ReactElement;
};

export default function EditWork({ id, completed, initialValues, trigger }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { message } = App.useApp();
  const { mutate: editWork, isPending: isEditPending } = useEditWork();
  const { mutate: forceCompleteWork, isPending: isForceCompletePending } = useForceCompleteWork();
  const { mutate: forceActivateBookedWork, isPending: isForceActivatePending } = useForceActivateBookedWork();
  const [bookingDate, setBookingDate, resetBookingDate] = useBookingDate(initialValues?.bookingDate);
  const [pickedUserId, setPickedUserId] = useState(initialValues?.userId);

  const reset = () => {
    form.resetFields();
    setPickedUserId(initialValues?.userId);
    resetBookingDate();
  };
  const { open, onOpen, onClose } = useDisclosure({
    onClose: reset,
  });

  const isPending = isEditPending || isForceCompletePending || isForceActivatePending;
  const isBooked = !!initialValues.bookingDate;

  const forceComplete = () => {
    if (completed) {
      throw new Error('이미 종료된 업무입니다.');
    }
    forceCompleteWork(
      { workId: id },
      {
        onSuccess: () => {
          message.info('업무 강제 종료 완료');
          onClose();
        },
      },
    );
  };

  const activateBooked = () => {
    if (!isBooked) {
      throw new Error('예약된 업무가 아닙니다.');
    }
    forceActivateBookedWork(
      { workId: id },
      {
        onSuccess: () => {
          message.info('예약된 업무 활성화 완료');
          onClose();
        },
      },
    );
  };

  const onFormFinish = (values: FormValues) => {
    const request: EditRequest = {
      workId: id,
      ...values,
    };

    editWork(request, {
      onSuccess: () => {
        message.success('업무 수정 완료');
        onClose();
      },
    });
  };

  const FooterFloatButton = isBooked ? (
    <Popconfirm
      key="force-activate-booked"
      placement="topLeft"
      title="정말로 활성화 하시겠습니까?"
      onConfirm={activateBooked}
      okText="활성화"
      cancelText="취소"
    >
      <Button className="float-left">활성화</Button>
    </Popconfirm>
  ) : (
    <Popconfirm
      key="force-complete"
      placement="topLeft"
      title="정말로 완료 처리 하시겠습니까?"
      onConfirm={forceComplete}
      okText="완료"
      cancelText="취소"
      okButtonProps={{ danger: true }}
    >
      <Button danger className="float-left">
        완료
      </Button>
    </Popconfirm>
  );

  return (
    <>
      {trigger({
        openModal: onOpen,
        isPending,
      })}

      <Modal
        title={isBooked ? '예약 수정' : '업무 수정'}
        open={open}
        onOk={form.submit}
        onCancel={onClose}
        okText="수정"
        cancelText="취소"
        confirmLoading={isPending}
        maskClosable={false}
        footer={[
          FooterFloatButton,
          <Button key="cancel" onClick={onClose}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            수정
          </Button>,
        ]}
      >
        <Form<FormValues>
          form={form}
          initialValues={omit(initialValues, ['userId', 'bookingDate'])} // omit controlled values
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
              disabled={completed}
              placeholder="업무를 배정받을 기사 선택"
            />
          </Form.Item>
          <Form.Item name="remark" label="비고">
            <Input.TextArea autoComplete="off" />
          </Form.Item>

          {isBooked && (
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
