'use client';
import { App, Button, Form, Input } from 'antd';
import { useRegisterContractor } from '@/features/contractor/register';
import { RegisterContractorRequest } from '@/shared/api/types/users';

export default function RegisterContractPage() {
  const { message } = App.useApp();
  const { mutate: registerContractor } = useRegisterContractor();

  const onFormFinish = async (values: RegisterContractorRequest) => {
    registerContractor(values, {
      onSuccess: () => {
        message.success('등록 완료');
      },
    });
  };

  return (
    <Form<RegisterContractorRequest> layout="vertical" onFinish={onFormFinish}>
      <Form.Item name="phoneNumber" label="전화번호" rules={[{ required: true }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" label="비밀번호" rules={[{ required: true }]}>
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      <Form.Item name="contractorCreateKey" label="생성 키" rules={[{ required: true }]}>
        <Input.Password autoComplete="new-password" />
      </Form.Item>

      <div className="w-full flex justify-end">
        <Button type="primary" htmlType="submit">
          Contractor 등록
        </Button>
      </div>
    </Form>
  );
}
