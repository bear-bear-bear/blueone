import { Dispatch, SetStateAction, useCallback } from 'react';
import { Form, Input, InputNumber, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Work } from '@typings';
import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import BookingDatePicker from '@components/Admin/content/WorkManagementTable/BookingDatePicker';
import UserSelector from '@components/Admin/content/commonParts/FormUserSelector';
import { useBookingDate } from '@hooks/useBookingDate';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { FullWorks, ProcessedWork } from './index';

type Props = {
  form: FormInstance<WorkAddFormFields>;
  validateTrigger: FormProps['validateTrigger'];
  setValidateTrigger: Dispatch<SetStateAction<FormProps['validateTrigger']>>;
  prevWork: ProcessedWork;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};
type WorkPutRequestBody = EndPoint['PUT /works/{workId}']['requestBody'];
type EditedWork = EndPoint['PUT /works/{workId}']['responses']['200'];
type WorkPutError = EndPoint['PUT /works/{workId}']['responses']['500'];
type WorkPatchError =
  | EndPoint['PATCH /works/{workId}']['responses']['403']
  | EndPoint['PATCH /works/{workId}']['responses']['404']
  | EndPoint['PATCH /works/{workId}']['responses']['500'];

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

const WorkEditForm = ({ form, validateTrigger, setValidateTrigger, prevWork, setSubmitLoading, closeModal }: Props) => {
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(prevWork.swrKey, axiosFetcher);
  const [bookingDate, setBookingDate] = useBookingDate(prevWork?.bookingDate);

  const cancelWorkCheck = useCallback(async (workId: Work['id']) => {
    try {
      await httpClient.patch(`/works/${workId}?state=init`).then((res) => res.data);
      message.error('업무 확인 취소 완료');
    } catch (err) {
      logAxiosError<WorkPatchError>(err as AxiosError<WorkPatchError>);
    }
  }, []);

  const onFormFinish: FormProps<WorkAddFormFields>['onFinish'] = async (values) => {
    const reqBody: WorkPutRequestBody = {
      ...values,
      waypoint: values.waypoint ?? null,
      userId: values.userId ?? null,
      remark: values.remark ?? null,
      bookingDate: prevWork.bookingDate ? bookingDate.format() : null,
    };

    setSubmitLoading(true);
    try {
      const updatedWork = await httpClient.put<EditedWork>(`/works/${prevWork.id}`, reqBody).then((res) => res.data);

      if (reqBody.userId !== prevWork.userId && !!prevWork.checkTime && !prevWork.endTime) {
        await cancelWorkCheck(prevWork.id);
        updatedWork.checkTime = null;
      }

      const nextWorks = works?.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
      await mutateWorks(nextWorks);
      message.success('업무 수정 완료');
      closeModal();
    } catch (err) {
      logAxiosError<WorkPutError>(err as AxiosError<WorkPutError>);
    }
    setSubmitLoading(false);
  };

  const onFormFinishFailed = useCallback(() => {
    setValidateTrigger(['onFinish', 'onChange']);
  }, [setValidateTrigger]);

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
        <UserSelector form={form} defaultUserId={prevWork.userId} disabled={!!prevWork.endTime} immutable />
      </Form.Item>
      <Form.Item name="remark" label="비고">
        <Input.TextArea autoComplete="off" />
      </Form.Item>

      {prevWork.bookingDate && (
        <Form.Item name="bookingDate" label="예약일시" required>
          <BookingDatePicker date={bookingDate} setDate={setBookingDate} />
        </Form.Item>
      )}
    </Form>
  );
};

export default WorkEditForm;
