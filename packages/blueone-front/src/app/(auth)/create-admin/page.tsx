'use client';
import { App, Button, Form, Input } from 'antd';
import { AxiosError } from 'axios';
import { EndPoint } from '@/typings';
import httpClient, { logAxiosError } from '@/utils/axios';
import styled from '@emotion/styled';

type RequestBody = EndPoint['POST /users/admin']['requestBody'];

export default function CreateAdminPage() {
  const { message } = App.useApp();

  const onFormFinish = async (values: RequestBody) => {
    try {
      await httpClient.post('/users/admin', values);
      message.success('등록 완료');
    } catch (err) {
      logAxiosError(err as AxiosError);
    }
  };

  return (
    <Form<RequestBody> layout="vertical" onFinish={onFormFinish}>
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
  );
}

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
