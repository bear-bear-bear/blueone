import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Form, Input, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import httpClient from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { FullUser } from './index';
import type { UpdateRequestBody } from './EditButton';

type Props = {
  form: FormInstance<UpdateRequestBody>;
  prevUser: FullUser;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};
type Users = EndPoint['GET /users']['responses']['200'];
type UpdatedUser = EndPoint['PUT /users/{userId}']['responses']['200'];

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 6 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages: FormProps<UpdateRequestBody>['validateMessages'] = {
  required: '필수 입력 값입니다.',
  pattern: {
    mismatch: '형식이 올바르지 않습니다.',
  },
};

const WorkEditForm = ({ form, prevUser, setSubmitLoading, closeModal }: Props) => {
  const { data: users, mutate: mutateUsers } = useSWRImmutable<Users>('/users', axiosFetcher);
  const {
    phoneNumber,
    UserInfo: {
      realname,
      residentRegistrationNumber,
      licenseNumber,
      licenseType,
      insuranceNumber,
      insuranceExpirationDate,
    },
  } = prevUser;
  const formInitialValues = useMemo<UpdateRequestBody>(
    () => ({
      phoneNumber,
      realname,
      residentRegistrationNumber,
      licenseNumber,
      licenseType,
      insuranceNumber,
      insuranceExpirationDate,
    }),
    [prevUser],
  );

  const onFormFinish: FormProps<UpdateRequestBody>['onFinish'] = useCallback(async (values) => {
    setSubmitLoading(true);
    try {
      const updatedUser = await httpClient.put<UpdatedUser>(`/users/${prevUser.id}`, values).then((res) => res.data);
      const nextUsers = users!.map((user) => (user.id !== updatedUser.id ? user : updatedUser));
      await mutateUsers(nextUsers);
      message.success('기사 정보 수정 완료');
      closeModal();
    } catch (err) {
      message.error('기사 정보 수정 중 에러 발생, 개발자에게 문의하세요.');
      console.error(err);
    }
    setSubmitLoading(false);
  }, []);

  return (
    <Form
      form={form}
      initialValues={formInitialValues}
      onFinish={onFormFinish}
      validateMessages={validateMessages}
      size="middle"
      {...layout}
    >
      <Form.Item
        name="phoneNumber"
        label="전화번호"
        rules={[{ required: true, pattern: /\d+/ }]}
        tooltip="ex) 01012340000"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="realname" label="실명" rules={[{ required: true }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="residentRegistrationNumber"
        label="주민등록번호"
        rules={[{ required: true, pattern: /[\d-]+/ }]}
        tooltip="ex) 800101-1000000"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="licenseType" label="면허 종류" rules={[{ required: true }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="licenseNumber"
        label="면허 번호"
        rules={[{ required: true, pattern: /[\d-]+/ }]}
        tooltip="ex) 12-000000-34"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="insuranceNumber"
        label="보험 번호"
        rules={[{ required: true, pattern: /[\d-]+/ }]}
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

export default WorkEditForm;
