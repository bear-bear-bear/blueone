import { Button, Form, FormProps, Input, message } from 'antd';
import { ColProps } from 'antd/lib/grid/col';
import { useCallback } from 'react';
import httpClient from '@utils/axios';

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 4 },
  wrapperCol: { flex: 'auto' },
};

const TempPage = () => {
  const onFormFinish: FormProps<{ phoneNumber: string }>['onFinish'] = useCallback(async ({ phoneNumber }) => {
    try {
      await httpClient.put<Response>('/user/admin', { phoneNumber });
      message.success('추가 완료');
    } catch (err) {
      message.error('수정 중 에러 발생, 개발자에게 문의하세요.');
      console.error(err);
    }
  }, []);

  return (
    <div style={{ width: '1000px' }}>
      <Form onFinish={onFormFinish} {...layout}>
        <Form.Item name="phoneNumber" label="비밀번호" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form>
    </div>
  );
};

export default TempPage;
