'use client';
import { useCallback, useState } from 'react';
import { Form, Input, InputNumber, Button, FormProps, Checkbox, App } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import UserSelector from '@/components/user/user-selector.component';
import { useBookingDate } from '@/hooks/use-booking-date.hook';
import httpClient, { logAxiosError } from '@/shared/api/axios';
import dayjs from '@/shared/lib/utils/dayjs';
import media from '@/shared/ui/media';
import { DeleteOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import type { RequestBody, RequestError, WorkAddFormValues } from '../works/add-form.component';
import BookingDatePicker from '../works/booking-date-picker.component';

export default function AddWorkForMobilePage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<WorkAddFormValues>();
  const [validateTrigger, setValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');
  const [bookingDate, setBookingDate] = useBookingDate();
  const [useBooking, setUseBooking] = useState<boolean>(false);

  const reset = useCallback(() => {
    form.resetFields();
    setBookingDate(dayjs());
    setUseBooking(false);
    setValidateTrigger('onFinish');
  }, [form, setBookingDate]);

  const onFormFinish = async (values: WorkAddFormValues) => {
    const reqBody: RequestBody = {
      ...values,
      waypoint: values.waypoint ?? null,
      userId: values.userId ?? null,
      remark: values.remark?.trim() ?? null,
      bookingDate: useBooking ? bookingDate.format() : null,
    };

    try {
      await httpClient.post<Response>('/works', reqBody);
      message.success('업무 등록 완료');
    } catch (err) {
      logAxiosError<RequestError>(err as AxiosError<RequestError>);
    }
  };

  const onFormFinishFailed = () => {
    setValidateTrigger(['onFinish', 'onChange']);
  };

  return (
    <Container>
      <ActionsWrapper>
        <Checkbox checked={useBooking} onChange={(e) => setUseBooking(e.target.checked)} style={{ padding: '5px 0' }}>
          예약
        </Checkbox>
        <Button type="text" icon={<DeleteOutlined />} onClick={reset}>
          초기화
        </Button>
      </ActionsWrapper>

      <Form<WorkAddFormValues>
        {...layout}
        form={form}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        validateTrigger={validateTrigger}
        validateMessages={validateMessages}
        size="middle"
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
          label="지원지수"
          tooltip="단위: 1000"
          rules={[{ type: 'number', min: 0, max: 16777216 }]}
        >
          <InputNumber autoComplete="off" />
        </Form.Item>
        <Form.Item name="userId" label="기사" tooltip="나중에 등록할 수도 있습니다.">
          <UserSelector form={form} />
        </Form.Item>
        <Form.Item name="remark" label="비고">
          <Input.TextArea autoComplete="off" />
        </Form.Item>

        {useBooking && (
          <Form.Item name="bookingDate" label="예약일시" required>
            <BookingDatePicker date={bookingDate} setDate={setBookingDate} />
          </Form.Item>
        )}
        <Form.Item wrapperCol={submitButtonWrapperCol}>
          <Button type="primary" htmlType="submit" block>
            등록
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};
const submitButtonWrapperCol: ColProps = { flex: 'auto' };

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

const Container = styled.div`
  max-width: 500px;

  & > .ant-form {
    width: 100%;

    .ant-form-item-label {
      label {
        height: fit-content;

        ${media.sm} {
          height: 32px;
        }
      }
    }

    .ant-form-item {
      transition: none;
      margin-bottom: 12px;

      ${media.sm} {
        margin-bottom: 24px;
      }
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.33rem;
  margin-bottom: 1rem;
`;
