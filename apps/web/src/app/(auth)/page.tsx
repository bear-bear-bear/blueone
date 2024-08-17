'use client';
import { useRouter } from 'next/navigation';
import { Input, Form, Button } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import { useSignIn } from '@/features/sign-in';
import { SignInRequest } from '@/shared/api/types/user';

export default function SignInPage() {
  const router = useRouter();
  const { mutate: signIn } = useSignIn();

  const onFinish = async (values: SignInRequest) => {
    signIn(values, {
      onSuccess: ({ role }) => {
        switch (role) {
          case 'contractor':
            router.push('/contractor/works');
            break;
          case 'subcontractor':
            router.push('/subcontractor');
            break;
        }
      },
    });
  };

  return (
    <Form<SignInRequest> initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" {...layout}>
      <Form.Item
        label="전화번호"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: '전화번호를 입력해주세요',
          },
          {
            pattern: /\d+/,
            message: '숫자만 입력해주세요',
          },
        ]}
      >
        <Input autoComplete="off" size="large" />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요',
          },
        ]}
      >
        <Input.Password autoComplete="off" size="large" />
      </Form.Item>

      <Button type="primary" htmlType="submit" size="large" block>
        로그인
      </Button>
    </Form>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
};
