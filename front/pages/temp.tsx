import { Button, Form, FormProps, Input, message } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import { useCallback } from 'react';
import httpClient from '@utils/axios';
import LogoutButton from '@components/LogoutButton';
import useAdmin from '@hooks/useAdmin';

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 4 },
  wrapperCol: { flex: 'auto' },
};

const TempPage = () => {
  const { isAdminLoggedIn } = useAdmin({ redirectTo: '/login' });

  const onFormFinish: FormProps<{ phoneNumber: string }>['onFinish'] = useCallback(async ({ phoneNumber }) => {
    try {
      await httpClient.post('/users/admin', { phoneNumber });
      message.success('추가 완료');
    } catch (err) {
      message.error('에러 발생');
      console.error(err);
    }
  }, []);

  if (!isAdminLoggedIn) return null;
  return (
    <div style={{ width: '1000px' }}>
      <Form onFinish={onFormFinish} {...layout}>
        <Form.Item name="phoneNumber" label="전번" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form>
      <LogoutButton />
    </div>
  );
};

export default TempPage;
