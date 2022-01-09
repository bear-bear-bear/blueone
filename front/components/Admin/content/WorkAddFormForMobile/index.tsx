import { useCallback, useState } from 'react';
import { Form, Input, InputNumber, Button, FormProps, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColProps } from 'antd/lib/grid/col';
import httpClient from '@utils/axios';
import UserSelecter from '@components/Admin/content/parts/UserSelecter';
import type { EndPoint } from '@typings';
import * as S from './styles';

type RequestBody = EndPoint['POST /works']['requestBody'];
type Response = EndPoint['POST /works']['responses']['201'];
export type WorkAddAntdFormFields = Omit<RequestBody, 'UserId' | 'waypoint' | 'remark'> & {
  UserId?: RequestBody['UserId'];
  waypoint?: RequestBody['waypoint'];
  remark?: RequestBody['remark'];
};

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};
const submitButtonWrapperCol: ColProps = { flex: 'auto' };

const validateMessages = {
  required: '필수 입력 값입니다.',
  types: {
    number: '숫자 형식이여야 합니다.',
  },
  number: {
    min: '${min}보다 커야합니다.',
    max: '${max}보다 작아야 합니다.',
  },
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};

const WorkAddForm = () => {
  const [form] = Form.useForm<WorkAddAntdFormFields>();
  const [validateTrigger, setValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const clearForm = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onFormFinish: FormProps<WorkAddAntdFormFields>['onFinish'] = useCallback(async (values) => {
    const reqBody: RequestBody = {
      ...values,
      waypoint: values.waypoint ?? null,
      UserId: values.UserId ?? null,
      remark: values.remark ?? null,
    };

    try {
      await httpClient.post<Response>('/works', reqBody);
      message.success('업무 등록 완료');
    } catch (err) {
      message.error('업무 등록 중 에러 발생, 개발자에게 문의하세요.');
      console.error(err);
    }
  }, []);

  const onFormFinishFailed = useCallback(() => {
    setValidateTrigger(['onFinish', 'onChange']);
  }, [setValidateTrigger]);

  return (
    <S.Container>
      <S.ActionsWrapper>
        <Button type="ghost" icon={<DeleteOutlined />} onClick={clearForm}>
          초기화
        </Button>
      </S.ActionsWrapper>

      <Form
        {...layout}
        form={form}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        validateTrigger={validateTrigger}
        validateMessages={validateMessages}
        size="middle"
      >
        <Form.Item name="origin" label="출발지" rules={[{ required: true }, { type: 'string', max: 255 }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="waypoint" label="경유지" rules={[{ type: 'string', max: 255 }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="destination" label="도착지" rules={[{ required: true }, { type: 'string', max: 255 }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="carModel" label="차종" rules={[{ required: true }, { type: 'string', max: 255 }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="charge"
          label="구간지수"
          tooltip="단위: 1000"
          rules={[{ type: 'number', min: 0, max: 16777216, required: true }]}
        >
          <InputNumber autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="subsidy"
          label="지원지수"
          tooltip="단위: 1000"
          rules={[{ type: 'number', min: 0, max: 16777216 }]}
        >
          <InputNumber autoComplete="off" />
        </Form.Item>
        <Form.Item name="UserId" label="기사" tooltip="나중에 등록할 수도 있습니다.">
          <UserSelecter form={form} />
        </Form.Item>
        <Form.Item name="remark" label="비고">
          <Input.TextArea autoComplete="off" />
        </Form.Item>
        <Form.Item wrapperCol={submitButtonWrapperCol}>
          <Button type="primary" htmlType="submit" block>
            등록
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
};

export default WorkAddForm;
