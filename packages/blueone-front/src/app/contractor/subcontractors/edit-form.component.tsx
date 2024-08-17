import { Dispatch, SetStateAction } from 'react';
import { Form, Input, FormProps, FormInstance, App } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import useSWRImmutable from 'swr/immutable';
import type { FullUser } from '@/app/contractor/subcontractors/page';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import regex from '@/shared/lib/utils/regex';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import type { UpdateRequest } from './edit-button.component';

type Users = EndPoint['GET /users']['responses']['200'];
type UpdatedUser = EndPoint['PUT /users/{userId}']['responses']['200'];

type Props = {
  form: FormInstance<UpdateRequest>;
  prevUser: FullUser;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};

export default function UserEditForm({ form, prevUser, setSubmitLoading, closeModal }: Props) {
  const { message } = App.useApp();
  const { data: users, mutate: mutateUsers } = useSWRImmutable<Users>('/users', axiosFetcher);

  const onFormFinish = async (values: UpdateRequest) => {
    setSubmitLoading(true);

    try {
      const updatedUser = await httpClient.put<UpdatedUser>(`/users/${prevUser.id}`, values).then((res) => res.data);
      const nextUsers = users?.map((user) => (user.id !== updatedUser.id ? user : updatedUser));
      await mutateUsers(nextUsers);
      message.success('기사 정보 수정 완료');
      closeModal();
    } catch (err) {
      throw err;
    }

    setSubmitLoading(false);
  };

  return (
    <Form
      form={form}
      initialValues={{
        phoneNumber: prevUser.phoneNumber,
        realname: prevUser.UserInfo.realname,
        dateOfBirth: prevUser.UserInfo.dateOfBirth,
        licenseNumber: prevUser.UserInfo.licenseNumber,
        licenseType: prevUser.UserInfo.licenseType,
        insuranceNumber: prevUser.UserInfo.insuranceNumber,
        insuranceExpirationDate: prevUser.UserInfo.insuranceExpirationDate,
      }}
      onFinish={onFormFinish}
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
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 6 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages: FormProps<UpdateRequest>['validateMessages'] = {
  required: '필수 입력 값입니다.',
  pattern: {
    mismatch: '형식이 올바르지 않습니다.',
  },
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};
