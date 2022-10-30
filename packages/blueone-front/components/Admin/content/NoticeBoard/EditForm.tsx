import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { Form, Input, FormProps, message, FormInstance } from 'antd';

import type { ColProps } from 'antd/lib/grid/col';

import type { AxiosError } from 'axios';

import useSWRImmutable from 'swr/immutable';

import type { NoticeList, ProcessedNotice } from './index';

import { RangePicker } from '@components/Admin/content/commonParts/Picker';
import type { EndPoint } from '@typings';
import httpClient, { logAxiosError } from '@utils/axios';
import dayjs from '@utils/dayjs';
import { axiosFetcher } from '@utils/swr';

type RequestBody = EndPoint['PUT /notice/{noticeId}']['requestBody'];
type EditedNotice = EndPoint['PUT /notice/{noticeId}']['responses']['200'];
type RequestError = EndPoint['PUT /notice/{noticeId}']['responses']['500'];
type Props = {
  form: FormInstance<RequestBody>;
  validateTrigger: FormProps['validateTrigger'];
  setValidateTrigger: Dispatch<SetStateAction<FormProps['validateTrigger']>>;
  prevNotice: ProcessedNotice;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
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

const NoticeEditForm = ({
  form,
  validateTrigger,
  setValidateTrigger,
  prevNotice,
  setSubmitLoading,
  closeModal,
}: Props) => {
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<NoticeList>(
    prevNotice.swrKey || '/notice',
    axiosFetcher,
  );

  const formInitialValues = useMemo(
    () => ({
      ...prevNotice,
      dateRange: [dayjs(prevNotice.startDate), dayjs(prevNotice.endDate)],
    }),
    [prevNotice],
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
        const updatedNotice = await httpClient
          .put<EditedNotice>(`/notice/${prevNotice.id}`, body)
          .then((res) => res.data);

        const nextNoticeList = noticeList?.map((notice) => (notice.id !== updatedNotice.id ? notice : updatedNotice));
        await mutateNoticeList(nextNoticeList);
        message.success('공지사항 수정 완료');
        closeModal();
      } catch (err) {
        logAxiosError<RequestError>(err as AxiosError<RequestError>);
      }
      setSubmitLoading(false);
    },
    [setSubmitLoading, prevNotice.id, noticeList, mutateNoticeList, closeModal],
  );

  const onFormFinishFailed = useCallback(() => {
    setValidateTrigger(['onFinish', 'onChange']);
  }, [setValidateTrigger]);

  return (
    <Form
      form={form}
      initialValues={formInitialValues}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFailed}
      validateTrigger={validateTrigger}
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
  );
};

export default NoticeEditForm;
