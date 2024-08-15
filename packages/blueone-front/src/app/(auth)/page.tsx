'use client';
import { Input, Form, Button } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import { useRouter } from 'next/navigation';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';

type Request = EndPoint['POST /user/sign-in']['requestBody'];
type User = EndPoint['POST /user/sign-in']['responses']['200'];

export default function LoginPage() {
  const router = useRouter();

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
      throw err;
    }
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" {...layout}>
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
