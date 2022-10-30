import { Dispatch, SetStateAction, useCallback } from 'react';
import { Form, Input, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint } from '@typings';
import httpClient, { logAxiosError } from '@utils/axios';
import regex from '@utils/regex';
import { axiosFetcher } from '@utils/swr';
import type { CreateRequestBody } from './AddButton';

type Props = {
  form: FormInstance<CreateRequestBody>;
  validateTrigger: FormProps['validateTrigger'];
  setValidateTrigger: Dispatch<SetStateAction<FormProps['validateTrigger']>>;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};
type Users = EndPoint['GET /users']['responses']['200'];
type CreatedUser = EndPoint['POST /users']['responses']['202'];
type UserCreationError = EndPoint['POST /users']['responses']['409'];

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 6 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages: FormProps<CreateRequestBody>['validateMessages'] = {
  required: '필수 입력 값입니다.',
  pattern: {
    mismatch: '형식이 올바르지 않습니다.',
  },
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};

const UserAddForm = ({ form, validateTrigger, setValidateTrigger, setSubmitLoading, closeModal }: Props) => {
  const { data: users, mutate: mutateUsers } = useSWRImmutable<Users>('/users', axiosFetcher);

  const onFormFinish: FormProps<CreateRequestBody>['onFinish'] = useCallback(
    async (values) => {
      setSubmitLoading(true);
      try {
        const createdUser = await httpClient.post<CreatedUser>('/users', values).then((res) => res.data);
        const nextUsers = [createdUser, ...(users ?? [])];
        await mutateUsers(nextUsers);
        message.success('기사 등록 완료');
        closeModal();
      } catch (err) {
        logAxiosError<UserCreationError>(err as AxiosError<UserCreationError>);
      }
      setSubmitLoading(false);
    },
    [users, closeModal, mutateUsers, setSubmitLoading],
  );

  const onFormFinishFailed = useCallback(() => {
    setValidateTrigger(['onFinish', 'onChange']);
  }, [setValidateTrigger]);

  return (
    <Form
      form={form}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFailed}
      validateTrigger={validateTrigger}
      validateMessages={validateMessages}
      size="middle"
      {...layout}
    >
      <Form.Item
        name="phoneNumber"
        label="전화번호"
        rules={[{ required: true }, { pattern: regex.phoneNumber }, { type: 'string', max: 20 }]}
        tooltip="ex) 01012340000"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="realname" label="실명" rules={[{ required: true }, { type: 'string', max: 32 }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="dateOfBirth"
        label="생년월일"
        rules={[{ required: true }, { pattern: regex.dateOfBirth }, { type: 'string', len: 6 }]}
        tooltip="ex) 800101"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="licenseType" label="면허 종류" rules={[{ required: true }, { type: 'string', max: 32 }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="licenseNumber"
        label="면허 번호"
        rules={[{ required: true }, { pattern: regex.licenseNumber }, { type: 'string', max: 32 }]}
        tooltip="ex) 12-000000-34"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="insuranceNumber"
        label="보험 번호"
        rules={[{ required: true }, { pattern: regex.insuranceNumber }, { type: 'string', max: 32 }]}
        tooltip="ex) 1-1234-0000000-000"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="insuranceExpirationDate" label="보험 만료일" rules={[{ required: true }]}>
        <Input autoComplete="off" type="date" />
      </Form.Item>
    </Form>
  );
};

export default UserAddForm;
