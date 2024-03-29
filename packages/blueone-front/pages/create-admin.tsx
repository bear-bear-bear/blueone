import { useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import LoginLayout from '@components/Login/Layout';
import styled from '@emotion/styled';
import httpClient, { logAxiosError } from '@utils/axios';

const TempPage = () => {
  const onFormFinish = useCallback(async (values) => {
    try {
      await httpClient.post('/users/admin', values);
      message.success('등록 완료');
    } catch (err) {
      logAxiosError(err as AxiosError);
    }
  }, []);

  return (
    <LoginLayout>
      <Form layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="phoneNumber" label="전화번호" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="password" label="비밀번호" rules={[{ required: true }]}>
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="adminCreateKey" label="생성 키" rules={[{ required: true }]}>
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <ButtonGroup>
          <Button type="primary" htmlType="submit">
            어드민 등록
          </Button>
        </ButtonGroup>
      </Form>
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
