import { Dispatch, SetStateAction } from 'react';
import { Form, Input, FormInstance, App } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';

type Request = EndPoint['POST /user/password']['requestBody'];
type Response = EndPoint['POST /user/password']['responses']['204'];
type Props = {
  form: FormInstance<Request>;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordChangeForm({ form, setSubmitLoading, closeModal }: Props) {
  const { message } = App.useApp();

  const onFormFinish = async (values: Request) => {
    const reqBody: Request = {
      password: values.password,
    };

    setSubmitLoading(true);
    try {
      await httpClient.post<Response>('/user/password', reqBody).then((res) => res.data);
      closeModal();
      message.success('비밀번호가 변경되었어요.', 4);
    } catch (err) {
      throw err;
    }
    setSubmitLoading(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFormFinish}
      validateMessages={validateMessages}
      size="middle"
      layout="vertical"
      {...layout}
    >
      <Form.Item name="password" label="새 비밀번호" rules={[{ required: true }]} className="mb-3 [&_label]:!text-base">
        <Input.Password autoComplete="off" size="large" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            },
          }),
        ]}
        className="mb-3 [&_label]:!text-base"
      >
        <Input.Password size="large" />
      </Form.Item>
    </Form>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 4 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages = {
  required: '필수 입력 값입니다.',
};
