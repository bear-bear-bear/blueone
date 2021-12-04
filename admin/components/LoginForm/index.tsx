import { Input, Form, Button } from 'antd';

import * as S from './styles';

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <S.InputFormItem
        label="아이디"
        name="id"
        rules={[{ required: true, message: '아이디를 입력해주세요' }]}
      >
        <Input size="large" />
      </S.InputFormItem>

      <S.InputFormItem
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
      >
        <Input.Password size="large" />
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
