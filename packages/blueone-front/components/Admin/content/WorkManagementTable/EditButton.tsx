import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Form, FormProps, message, Modal, Popconfirm, Tooltip } from 'antd';
import { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';
import { EndPoint } from '@typings';
import { EditOutlined } from '@ant-design/icons';
import type { WorkAddFormValues } from '@components/Admin/content/WorkManagementTable/AddForm';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import EditForm from './EditForm';
import type { ProcessedWork, FullWorks } from './index';

type Props = {
  record: ProcessedWork;
};

type WorkForceFinishResponse = EndPoint['PATCH /works/{workId}/force-finish']['responses']['200'];
type WorkForceFinishError =
  | EndPoint['PATCH /works/{workId}/force-finish']['responses']['403']
  | EndPoint['PATCH /works/{workId}/force-finish']['responses']['404']
  | EndPoint['PATCH /works/{workId}/force-finish']['responses']['500'];

type WorkForceActivateResponse = EndPoint['PATCH /works/{workId}/force-activate']['responses']['200'];
type WorkForceActivateError =
  | EndPoint['PATCH /works/{workId}/force-activate']['responses']['403']
  | EndPoint['PATCH /works/{workId}/force-activate']['responses']['404']
  | EndPoint['PATCH /works/{workId}/force-activate']['responses']['500'];

const EditButton = ({ record }: Props) => {
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(record.swrKey, axiosFetcher);
  const [form] = Form.useForm<WorkAddFormValues>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<FormProps['validateTrigger']>('onFinish');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setFormValidateTrigger('onFinish');
  }, [form]);

  const handleEditIconClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const forceFinishWork = useCallback(async () => {
    try {
      const updatedWork = await httpClient
        .patch<WorkForceFinishResponse>(`/works/${record.id}/force-finish`)
        .then((res) => res.data);

      const nextWorks = works?.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
      await mutateWorks(nextWorks);

      message.info('업무 강제 종료 완료');
      closeModal();
    } catch (err) {
      logAxiosError<WorkForceFinishError>(err as AxiosError<WorkForceFinishError>);
    }
  }, [closeModal, mutateWorks, record.id, works]);

  const activateWork = useCallback(async () => {
    try {
      const updatedWork = await httpClient
        .patch<WorkForceActivateResponse>(`/works/${record.id}/force-activate`)
        .then((res) => res.data);

      const nextWorks = works?.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
      await mutateWorks(nextWorks);

      message.info('예약된 업무 활성화 완료');
      closeModal();
    } catch (err) {
      logAxiosError<WorkForceActivateError>(err as AxiosError<WorkForceActivateError>);
    }
  }, [closeModal, mutateWorks, record.id, works]);

  return (
    <>
      <Tooltip title="수정">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEditIconClick} />
      </Tooltip>

      {isModalOpen && (
        <Modal
          title={record.bookingDate ? '예약 수정' : '업무 수정'}
          open
          maskClosable={false}
          confirmLoading={submitLoading}
          onOk={form.submit}
          onCancel={closeModal}
          okText="수정"
          cancelText="취소"
          footer={[
            ...(record.bookingDate
              ? [
                  <Popconfirm
                    key="done"
                    placement="topLeft"
                    title="정말로 활성화 하시겠습니까?"
                    onConfirm={activateWork}
                    okText="활성화"
                    cancelText="취소"
                  >
                    <Button style={{ float: 'left' }}>활성화</Button>
                  </Popconfirm>,
                ]
              : [
                  <Popconfirm
                    key="done"
                    placement="topLeft"
                    title="정말로 완료 처리 하시겠습니까?"
                    onConfirm={forceFinishWork}
                    okText="완료"
                    cancelText="취소"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger style={{ float: 'left' }}>
                      완료
                    </Button>
                  </Popconfirm>,
                ]),
            <Button key="cancel" onClick={closeModal}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={form.submit}>
              수정
            </Button>,
          ]}
        >
          <EditForm
            form={form}
            validateTrigger={formValidateTrigger}
            setValidateTrigger={setFormValidateTrigger}
            prevWork={record}
            closeModal={closeModal}
            setSubmitLoading={setSubmitLoading}
          />
        </Modal>
      )}
    </>
  );
};

export default EditButton;
