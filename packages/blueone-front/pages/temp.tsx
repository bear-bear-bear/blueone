import { useCallback } from 'react';
import { Button, Form, FormProps, Input, message } from 'antd';
import { AxiosError } from 'axios';
import LoginLayout from '@components/Login/Layout';
import styled from '@emotion/styled';
import useAdmin from '@hooks/useAdmin';
import httpClient, { logAxiosError } from '@utils/axios';

const TempPage = () => {
  const { isAdminLoggedIn } = useAdmin({ redirectTo: '/login' });

  const onFormFinish: FormProps<{ phoneNumber: string }>['onFinish'] = useCallback(async ({ phoneNumber }) => {
    try {
      await httpClient.post('/users/admin', { phoneNumber });
      message.success('등록 완료');
    } catch (err) {
      logAxiosError(err as AxiosError);
    }
  }, []);

  if (!isAdminLoggedIn) return null;
  return (
    <LoginLayout>
      <Form layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="phoneNumber" label="전화번호" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
      </Form>

      <ButtonGroup>
        <Button type="primary" htmlType="submit">
          어드민 등록
        </Button>
      </ButtonGroup>
    </LoginLayout>
  );
};

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export default TempPage;
