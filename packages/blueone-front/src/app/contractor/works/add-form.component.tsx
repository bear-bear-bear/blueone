import { Dispatch, SetStateAction } from 'react';
import { Form, Input, InputNumber, FormProps, FormInstance, App } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import useSWRImmutable from 'swr/immutable';
import type { FullWorks, ProcessedWork } from '@/app/contractor/works/page';
import SubcontractorSelector from '@/components/subcontractor/subcontractor-selector.component';
import { useBookingDate } from '@/hooks/use-booking-date.hook';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import BookingDatePicker from './booking-date-picker.component';

export type Request = EndPoint['POST /works']['requestBody'];
export type Response = EndPoint['POST /works']['responses']['201'];
export type RequestError = EndPoint['POST /works']['responses']['400'] | EndPoint['POST /works']['responses']['500'];
export type WorkAddFormValues = Omit<Request, 'userId' | 'waypoint' | 'remark'> & {
  userId?: Request['userId'];
  waypoint?: Request['waypoint'];
  remark?: Request['remark'];
};

type Props = {
  form: FormInstance<WorkAddFormValues>;
  validateTrigger: FormProps['validateTrigger'];
  setValidateTrigger: Dispatch<SetStateAction<FormProps['validateTrigger']>>;
  prevWork?: ProcessedWork;
  swrKey?: string;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
  useBooking?: boolean;
};

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

const WorkAddForm = ({
  form,
  validateTrigger,
  setValidateTrigger,
  setSubmitLoading,
  prevWork,
  swrKey = prevWork?.swrKey,
  useBooking = false,
}: Props) => {
  const { message } = App.useApp();
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(swrKey || '/works', axiosFetcher, {
    revalidateOnMount: false,
  });
  const [bookingDate, setBookingDate] = useBookingDate(prevWork?.bookingDate);

  const onFormFinish = async (values: WorkAddFormValues) => {
    const reqBody: Request = {
      ...values,
      waypoint: values.waypoint ?? null,
      userId: values.userId ?? null,
      remark: values.remark?.trim() ?? null,
      bookingDate: useBooking ? bookingDate.format() : null,
    };

    setSubmitLoading(true);
    try {
      const createdWork = await httpClient.post<Response>('/works', reqBody).then((res) => res.data);

      const nextWorks = works?.map((work) => (work.id !== createdWork.id ? work : createdWork));
      await mutateWorks(nextWorks);
      message.success('업무 등록 완료');
      setValidateTrigger('onFinish');
    } catch (err) {
      throw err;
    }
    setSubmitLoading(false);
  };

  const onFormFinishFailed = () => {
    setValidateTrigger(['onFinish', 'onChange']);
  };

  return (
    <Form
      form={form}
      initialValues={prevWork}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFailed}
      validateTrigger={validateTrigger}
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
        label="지원지수"
        tooltip="단위: 1000"
        rules={[{ type: 'number', min: 0, max: 16777216 }]}
      >
        <InputNumber autoComplete="off" />
      </Form.Item>
      <Form.Item name="userId" label="기사" tooltip="나중에 등록할 수도 있습니다.">
        <SubcontractorSelector form={form} defaultValue={prevWork?.userId} immutable />
      </Form.Item>
      <Form.Item name="remark" label="비고">
        <Input.TextArea autoComplete="off" />
      </Form.Item>

      {useBooking && (
        <Form.Item name="bookingDate" label="예약일시" required>
          <BookingDatePicker date={bookingDate} setDate={setBookingDate} />
        </Form.Item>
      )}
    </Form>
  );
};

export default WorkAddForm;
