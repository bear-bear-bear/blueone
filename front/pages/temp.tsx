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
      await httpClient.post<Response>('/user/admin', { phoneNumber });
      message.success('추가 완료');
    } catch (err) {
      message.error('에러 발생');
      console.error(err);
    }
  }, []);

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
    </div>
  );
};

export default TempPage;
