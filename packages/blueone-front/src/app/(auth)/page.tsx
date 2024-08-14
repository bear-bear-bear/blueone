'use client';
import { useState } from 'react';
import { Input, Form, Button, FormProps } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import httpClient, { logAxiosError } from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import styled from '@emotion/styled';

type Request = EndPoint['POST /user/sign-in']['requestBody'];
type User = EndPoint['POST /user/sign-in']['responses']['200'];
type RequestError =
  | EndPoint['POST /user/sign-in']['responses']['409']
  | EndPoint['POST /user/sign-in']['responses']['500'];

export default function LoginPage() {
  const router = useRouter();
  const [validateTrigger, setValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const onFinish = async (values: Request) => {
    try {
      const user = await httpClient.post<User>('/user/sign-in', values).then((res) => res.data);

      switch (user.role) {
        case 'contractor':
          router.push('/contractor/works');
          break;
        case 'subcontractor':
          router.push('/subcontractor');
          break;
        default:
      }
    } catch (err) {
      logAxiosError<RequestError>(err as AxiosError<RequestError>);
    }
  };

  const onFinishFailed = () => {
    setValidateTrigger(['onFinish', 'onChange']);
  };

  return (
    <Form
      name="sign-in-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger={validateTrigger}
      autoComplete="off"
      {...layout}
    >
      <InputFormItem
        label="전화번호"
        name="phoneNumber"
        rules={[{ required: true, message: '전화번호를 입력해주세요' }]}
      >
        <NumericInput type="number" autoComplete="off" size="large" />
      </InputFormItem>

      <InputFormItem label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
        <Input.Password autoComplete="off" size="large" />
      </InputFormItem>

      <ButtonFormItem>
        <Button type="primary" htmlType="submit" size="large" block>
          로그인
        </Button>
      </ButtonFormItem>
    </Form>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};

const InputFormItem = styled(Form.Item)`
  margin-bottom: 0.66rem;

  .ant-form-item-label {
    padding: 0;
  }
`;

const ButtonFormItem = styled(Form.Item)`
  margin-top: 2rem;
  margin-bottom: 0;
`;

const NumericInput = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
