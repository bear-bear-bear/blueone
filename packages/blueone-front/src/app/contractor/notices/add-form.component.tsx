import { Dispatch, SetStateAction } from 'react';
import { Form, Input, FormInstance, DatePicker, App } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import useSWRImmutable from 'swr/immutable';
import httpClient from '@/shared/api/axios';
import { EndPoint } from '@/shared/api/types';
import dayjs from '@/shared/lib/utils/dayjs';
import { PackDateRange, unpackDateRange } from '@/shared/lib/utils/pack-date-range';
import { axiosFetcher } from '@/shared/lib/utils/swr';

const { RangePicker } = DatePicker;

type Request = EndPoint['POST /notices']['requestBody'];
type NoticeList = EndPoint['GET /notices']['responses']['200'];
type Response = EndPoint['POST /notices']['responses']['201'];

type FormValues = PackDateRange<Request>;
type Props = {
  form: FormInstance<FormValues>;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  swrKey: string;
};

export default function NoticeAddForm({ form, setSubmitLoading, closeModal, swrKey }: Props) {
  const { message } = App.useApp();
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<NoticeList>(
    swrKey || '/notices',
    axiosFetcher,
    {
      revalidateOnMount: false,
    },
  );

  const onFormFinish = async (values: FormValues) => {
    setSubmitLoading(true);
    try {
      const createdNotice = await httpClient
        .post<Response>('/notices', unpackDateRange(values))
        .then((res) => res.data);

      const nextNoticeList = noticeList?.map((work) => (work.id !== createdNotice.id ? work : createdNotice));
      await mutateNoticeList(nextNoticeList);
      message.success('공지사항 등록 완료');
      closeModal();
    } catch (err) {
      throw err;
    }
    setSubmitLoading(false);
  };

  return (
    <Form form={form} onFinish={onFormFinish} validateMessages={validateMessages} size="middle" {...layout}>
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
