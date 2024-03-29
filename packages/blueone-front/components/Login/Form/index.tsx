import { useCallback, useState } from 'react';
import { Input, Form, Button, FormProps } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import type { EndPoint } from '@typings';
import httpClient, { logAxiosError } from '@utils/axios';
import * as S from './styles';

type RequestBody = EndPoint['POST /user/login']['requestBody'];
type User = EndPoint['POST /user/login']['responses']['200'];
type RequestError = EndPoint['POST /user/login']['responses']['409'] | EndPoint['POST /user/login']['responses']['500'];

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};

const LoginForm = () => {
  const router = useRouter();
  const [validateTrigger, setValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const onFinish: FormProps<RequestBody>['onFinish'] = async (values) => {
    try {
      const user = await httpClient.post<User>('/user/login', values).then((res) => res.data);

      switch (user.role) {
        case 'admin':
          router.push('/');
          break;
        case 'user':
          router.push('worker');
          break;
        default:
      }
    } catch (err) {
      logAxiosError<RequestError>(err as AxiosError<RequestError>);
    }
  };

  const onFinishFailed = useCallback(() => {
    setValidateTrigger(['onFinish', 'onChange']);
  }, [setValidateTrigger]);

  return (
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger={validateTrigger}
      autoComplete="off"
      {...layout}
    >
      <S.InputFormItem
        label="전화번호"
        name="phoneNumber"
        rules={[{ required: true, message: '전화번호를 입력해주세요' }]}
      >
        <S.NumericInput type="number" autoComplete="off" size="large" />
      </S.InputFormItem>

      <S.InputFormItem
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
      >
        <Input.Password autoComplete="off" size="large" />
      </S.InputFormItem>

      <S.ButtonFormItem>
        <Button type="primary" htmlType="submit" size="large" block>
          로그인
        </Button>
      </S.ButtonFormItem>
    </Form>
  );
};

export default LoginForm;
