import { useState } from 'react';
import { App, Button, Form, Modal, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { ProcessedWork, FullWorks } from '@/app/contractor/works/page';
import httpClient from '@/shared/api/axios';
import { EndPoint } from '@/shared/api/types';
import { EditRequest } from '@/shared/api/types/works';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { EditOutlined } from '@ant-design/icons';
import EditForm from './edit-form.component';

type WorkForceCompleteResponse = EndPoint['PATCH /works/{workId}/force-complete']['responses']['200'];
type WorkForceActivateResponse = EndPoint['PATCH /works/{workId}/force-activate']['responses']['200'];

type Props = {
  record: ProcessedWork;
};

export default function EditButton({ record }: Props) {
  const { message } = App.useApp();
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(record.swrKey, axiosFetcher);
  const [form] = Form.useForm<EditRequest>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEditIconClick = () => {
    setIsModalOpen(true);
  };

  const forceCompleteWork = async () => {
    try {
      const updatedWork = await httpClient
        .patch<WorkForceCompleteResponse>(`/works/${record.id}/force-complete`)
        .then((res) => res.data);

      const nextWorks = works?.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
      await mutateWorks(nextWorks);

      message.info('업무 강제 종료 완료');
      closeModal();
    } catch (err) {
      throw err;
    }
  };

  const activateWork = async () => {
    try {
      const updatedWork = await httpClient
        .patch<WorkForceActivateResponse>(`/works/${record.id}/force-activate`)
        .then((res) => res.data);

      const nextWorks = works?.map((work) => (work.id !== updatedWork.id ? work : updatedWork));
      await mutateWorks(nextWorks);

      message.info('예약된 업무 활성화 완료');
      closeModal();
    } catch (err) {
      throw err;
    }
  };

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
                    <Button className="float-left">활성화</Button>
                  </Popconfirm>,
                ]
              : [
                  <Popconfirm
                    key="done"
                    placement="topLeft"
                    title="정말로 완료 처리 하시겠습니까?"
                    onConfirm={forceCompleteWork}
                    okText="완료"
                    cancelText="취소"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger className="float-left">
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
          <EditForm form={form} prevWork={record} closeModal={closeModal} setSubmitLoading={setSubmitLoading} />
        </Modal>
      )}
    </>
  );
}
