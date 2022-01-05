import { Dispatch, SetStateAction, useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Form, Input, InputNumber, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import UserSelecter from '@components/Admin/content/parts/UserSelecter';
import httpClient from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { WorkAddAntdFormFields } from '@components/Admin/content/WorkAddFormForMobile';
import type { EndPoint } from '@typings';
import type { FullWorks, ProcessedWork } from './index';

type Props = {
  form: FormInstance<WorkAddAntdFormFields>;
  validateTrigger: FormProps['validateTrigger'];
  setValidateTrigger: Dispatch<SetStateAction<FormProps['validateTrigger']>>;
  prevWork?: ProcessedWork;
  swrKey?: string;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};
type RequestBody = EndPoint['PUT /works/{workId}']['requestBody'];
type Response = EndPoint['PUT /works/{workId}']['responses']['200'];

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
}: Props) => {
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(swrKey || '/works', axiosFetcher);

  const onFormFinish: FormProps<WorkAddAntdFormFields>['onFinish'] = useCallback(
    async (values) => {
      const reqBody: RequestBody = {
        ...values,
        waypoint: values.waypoint ?? null,
        UserId: values.UserId ?? null,
        remark: values.remark ?? null,
      };

      setSubmitLoading(true);
      try {
        const updatedWork = await httpClient.post<Response>('/works', reqBody).then((res) => res.data);

        const nextWorks = works!.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
        await mutateWorks(nextWorks);
        message.success('업무 등록 완료');
        setValidateTrigger('onFinish');
      } catch (err) {
        message.error('업무 등록 중 에러 발생, 개발자에게 문의하세요.');
        console.error(err);
      }
      setSubmitLoading(false);
    },
    [setSubmitLoading, works, mutateWorks, setValidateTrigger],
  );

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
      <Form.Item name="UserId" label="기사" tooltip="나중에 등록할 수도 있습니다.">
        <UserSelecter form={form} defaultUserId={prevWork?.UserId} immutable />
      </Form.Item>
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
        name="subsidy"
        label="지원지수"
        tooltip="단위: 1000"
        rules={[{ type: 'number', min: 0, max: 16777216 }]}
      >
        <InputNumber autoComplete="off" />
      </Form.Item>
      <Form.Item name="remark" label="비고">
        <Input.TextArea autoComplete="off" />
      </Form.Item>
    </Form>
  );
};

export default WorkAddForm;