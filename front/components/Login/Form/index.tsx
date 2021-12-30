import { useRouter } from 'next/router';
import { Input, Form, Button, FormProps, message } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import httpClient from '@utils/axios';
import type { AxiosError } from 'axios';
import type { EndPoint } from '@typings';
import * as S from './styles';

type RequestBody = EndPoint['POST /user/login']['requestBody'];
type Responses = EndPoint['POST /user/login']['responses'];

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};

const LoginForm = () => {
  const router = useRouter();

  const onFinish: FormProps<RequestBody>['onFinish'] = async (values) => {
    try {
      const user = await httpClient.post<Responses['200']>('/user/login', values).then((res) => res.data);

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
      const errorMessage = (err as AxiosError).response?.data.message;
      message.error(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" {...layout}>
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
