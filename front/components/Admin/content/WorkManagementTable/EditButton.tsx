import { MouseEventHandler, useCallback, useState } from 'react';

import { EditOutlined } from '@ant-design/icons';

import { Button, Form, FormProps, message, Modal, Popconfirm, Tooltip } from 'antd';
import { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';

import EditForm from './EditForm';

import type { ProcessedWork, FullWorks } from './index';

import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import { EndPoint } from '@typings';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';

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
  const [form] = Form.useForm<WorkAddFormFields>();
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

      message.info('?????? ?????? ?????? ??????');
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

      message.info('????????? ?????? ????????? ??????');
      closeModal();
    } catch (err) {
      logAxiosError<WorkForceActivateError>(err as AxiosError<WorkForceActivateError>);
    }
  }, [closeModal, mutateWorks, record.id, works]);

  return (
    <>
      <Tooltip title="??????">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={handleEditIconClick} />
      </Tooltip>
      <Modal
        title={record.bookingDate ? '?????? ??????' : '?????? ??????'}
        visible={isModalOpen}
        maskClosable={false}
        confirmLoading={submitLoading}
        onOk={form.submit}
        onCancel={closeModal}
        okText="??????"
        cancelText="??????"
        footer={[
          ...(record.bookingDate
            ? [
                <Popconfirm
                  key="done"
                  placement="topLeft"
                  title="????????? ????????? ???????????????????"
                  onConfirm={activateWork}
                  okText="?????????"
                  cancelText="??????"
                >
                  <Button style={{ float: 'left' }}>?????????</Button>
                </Popconfirm>,
              ]
            : [
                <Popconfirm
                  key="done"
                  placement="topLeft"
                  title="????????? ?????? ?????? ???????????????????"
                  onConfirm={forceFinishWork}
                  okText="??????"
                  cancelText="??????"
                  okButtonProps={{ danger: true }}
                >
                  <Button danger style={{ float: 'left' }}>
                    ??????
                  </Button>
                </Popconfirm>,
              ]),
          <Button key="cancel" onClick={closeModal}>
            ??????
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            ??????
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
    </>
  );
};

export default EditButton;
