'use client';
import { useRouter } from 'next/navigation';
import { Input, Form, Button } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import { Me, useFetchMe } from '@/entities/me';
import { useSignIn } from '@/features/sign-in';
import { SignInRequest } from '@/shared/api/types/user';
import { useIsomorphicLayoutEffect } from '@/shared/lib/hooks/use-isomorphic-layout-effect.hook';

export default function SignInPage() {
  const router = useRouter();
  const { mutate: signIn } = useSignIn();
  const { data: me } = useFetchMe();

  const redirect = (me: Me.Model) => {
    const serviceEntry = Me.serviceEntry(me);

    router.push(serviceEntry);
  };

  const onFinish = async (values: SignInRequest) => {
    signIn(values, {
      onSuccess: (me) => {
        redirect(me);
      },
    });
  };

  useIsomorphicLayoutEffect(() => {
    if (me) {
      redirect(me);
    }
  }, [me]);

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
