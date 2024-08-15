'use client';
import { App, Button, Form, Input } from 'antd';
import httpClient from '@/shared/api/axios';
import { EndPoint } from '@/shared/api/types';
import styled from '@emotion/styled';

type Request = EndPoint['POST /users/contractor']['requestBody'];

export default function CreateContractorPage() {
  const { message } = App.useApp();

  const onFormFinish = async (values: Request) => {
    try {
      await httpClient.post('/users/contractor', values);
      message.success('등록 완료');
    } catch (err) {
      throw err;
    }
  };

  return (
    <Form<Request> layout="vertical" onFinish={onFormFinish}>
      <Form.Item name="phoneNumber" label="전화번호" rules={[{ required: true }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" label="비밀번호" rules={[{ required: true }]}>
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      <Form.Item name="contractorCreateKey" label="생성 키" rules={[{ required: true }]}>
        <Input.Password autoComplete="new-password" />
      </Form.Item>

      <ButtonGroup>
        <Button type="primary" htmlType="submit">
          Contractor 등록
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
