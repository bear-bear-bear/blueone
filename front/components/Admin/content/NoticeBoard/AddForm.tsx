import { Dispatch, SetStateAction, useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Form, Input, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import type { AxiosError } from 'axios';
import { RangePicker } from '@components/Admin/content/commonParts/Picker';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import dayjs from 'dayjs';
import type { NoticeList } from './index';

type RequestBody = EndPoint['POST /notice']['requestBody'];
type Response = EndPoint['POST /notice']['responses']['202'];
type RequestError = EndPoint['POST /notice']['responses']['500'];
type Props = {
  form: FormInstance<RequestBody>;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  swrKey: string;
};

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

const NoticeAddForm = ({ form, setSubmitLoading, closeModal, swrKey }: Props) => {
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<NoticeList>(
    swrKey || '/notice',
    axiosFetcher,
    {
      revalidateOnMount: false,
    },
  );

  const onFormFinish: FormProps<RequestBody>['onFinish'] = useCallback(
    async (values) => {
      const body: RequestBody = {
        title: values.title,
        content: values.content,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD'),
      };

      setSubmitLoading(true);
      try {
        const createdNotice = await httpClient.post<Response>('/notice', body).then((res) => res.data);

        const nextNoticeList = noticeList!.map((work) => (work.id !== createdNotice.id ? work : createdNotice));
        await mutateNoticeList(nextNoticeList);
        message.success('공지사항 등록 완료');
        closeModal();
      } catch (err) {
        logAxiosError<RequestError>(err as AxiosError<RequestError>);
      }
      setSubmitLoading(false);
    },
    [setSubmitLoading, noticeList, mutateNoticeList, closeModal],
  );

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
};

export default NoticeAddForm;
