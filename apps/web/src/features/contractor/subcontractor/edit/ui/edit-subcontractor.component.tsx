import { ReactElement } from 'react';
import { Form, Input, App, Modal, FormProps } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import { User } from '@/shared/api/types';
import { EditRequest } from '@/shared/api/types/users';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import regex from '@/shared/lib/utils/regex';
import useEditSubContractor from '../api/use-edit-subcontractor.mutation';

type FormValues = Omit<EditRequest, 'userId'>;

type TriggerProps = {
  openModal: () => void;
  isPending: boolean;
};
type Props = {
  id: User['id'];
  initialValues: FormValues;
  trigger: (props: TriggerProps) => ReactElement;
};

export default function EditSubContractor({ id, initialValues, trigger }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { message } = App.useApp();
  const { mutate: editSubContractor, isPending } = useEditSubContractor();
  const { open, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      form.setFieldsValue(initialValues);
    },
  });

  const onFormFinish = (values: FormValues) => {
    const request: EditRequest = {
      userId: id,
      ...values,
    };

    editSubContractor(request, {
      onSuccess: () => {
        message.success('기사 정보 수정 완료');
        onClose();
      },
    });
  };

  return (
    <>
      {trigger({
        openModal: onOpen,
        isPending,
      })}

      <Modal
        title="기사 정보 수정"
        open={open}
        onOk={form.submit}
        onCancel={onClose}
        okText="수정"
        cancelText="취소"
        confirmLoading={isPending}
        maskClosable={false}
      >
        <Form<FormValues>
          form={form}
          onFinish={onFormFinish}
          validateMessages={validateMessages}
          size="middle"
          {...layout}
        >
          <Form.Item
            name="phoneNumber"
            label="전화번호"
            rules={[{ required: true }, { pattern: regex.phoneNumber }, { type: 'string', max: 20 }]}
            tooltip="ex) 01012340000"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="realname" label="실명" rules={[{ required: true }, { type: 'string', max: 32 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="생년월일"
            rules={[{ required: true }, { pattern: regex.dateOfBirth }, { type: 'string', len: 6 }]}
            tooltip="ex) 800101"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="licenseType" label="면허 종류" rules={[{ required: true }, { type: 'string', max: 32 }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="licenseNumber"
            label="면허 번호"
            rules={[{ required: true }, { pattern: regex.licenseNumber }, { type: 'string', max: 32 }]}
            tooltip="ex) 12-000000-34"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="insuranceNumber"
            label="보험 번호"
            rules={[{ required: true }, { pattern: regex.insuranceNumber }, { type: 'string', max: 32 }]}
            tooltip="ex) 1-1234-0000000-000"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="insuranceExpirationDate" label="보험 만료일" rules={[{ required: true }]}>
            <Input autoComplete="off" type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 6 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages: FormProps['validateMessages'] = {
  required: '필수 입력 값입니다.',
  pattern: {
    mismatch: '형식이 올바르지 않습니다.',
  },
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};
