import { ReactElement } from 'react';
import { Form, Input, DatePicker, App, Modal } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import { AddRequest } from '@/shared/api/types/notices';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import dayjs from '@/shared/lib/utils/dayjs';
import { PackDateRange, unpackDateRange } from '@/shared/lib/utils/pack-date-range';
import useAddNotice from '../api/use-add-notice.mutation';

const { RangePicker } = DatePicker;

type FormValues = PackDateRange<AddRequest>;

type TriggerProps = {
  openModal: () => void;
  isPending: boolean;
};
type Props = {
  trigger: (props: TriggerProps) => ReactElement;
};

export default function AddNotice({ trigger }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { message } = App.useApp();
  const { mutate: addNotice, isPending } = useAddNotice();
  const { open, onOpen, onClose } = useDisclosure({
    onClose: form.resetFields,
  });

  const onFormFinish = (values: FormValues) => {
    addNotice(unpackDateRange(values), {
      onSuccess: () => {
        message.success('공지사항 등록 완료');
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
        title="공지사항 등록"
        open={open}
        onOk={form.submit}
        onCancel={onClose}
        okText="등록"
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
          <Form.Item name="title" label="제목" rules={[{ required: true }, { type: 'string', max: 20 }]}>
            <Input autoComplete="off" maxLength={20} />
          </Form.Item>
          <Form.Item name="content" label="내용" rules={[{ required: true }]}>
            <Input.TextArea autoComplete="off" spellCheck={false} style={{ height: '10rem' }} />
          </Form.Item>
          <Form.Item name="dateRange" label="기간" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
            <RangePicker disabledDate={(current: dayjs.Dayjs) => current < dayjs().startOf('day')} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 5 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages = {
  required: '필수 입력 값입니다.',
  string: {
    max: '최대 입력 수를 초과했습니다.',
  },
};
