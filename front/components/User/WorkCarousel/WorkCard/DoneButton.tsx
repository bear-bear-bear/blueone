import { MouseEventHandler, FC, useCallback, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Button, message, Modal } from 'antd';
import type { Work, EndPoint } from '@typings';
import { axiosFetcher } from '@utils/swr';
import httpClient from '@utils/axios';

type Props = {
  workId: Work['id'];
  isWorkChecked: boolean;
  isWorkDone: boolean;
};
type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type PatchedWork = EndPoint['PATCH /works/{workId}']['responses']['200'];

const DoneButton: FC<Props> = ({ workId, isWorkChecked, isWorkDone }) => {
  const { data: works, mutate: mutateWorks } = useSWRImmutable<MyWorks>('/user/works', axiosFetcher);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteWork = useCallback(async () => {
    if (!isWorkChecked) {
      message.warn('확인 처리되지 않은 업무는 완료할 수 없어요.', 4);
      return;
    }
    setLoading(true);
    try {
      const patchedWork = await httpClient.patch<PatchedWork>(`/works/${workId}?state=done`).then((res) => res.data);
      const nextWorks = works?.map((work) => (work.id !== patchedWork.id ? work : patchedWork));
      setLoading(false);
      setIsModalOpen(false);
      await mutateWorks(nextWorks);
      message.success('업무가 완료 처리 되었어요. 고생하셨습니다 :)', 4);
      if (nextWorks?.find((work) => work.endTime === null)) {
        message.success('완료된 업무는 완료되지 않은 업무 뒤쪽으로 배치되었어요.', 4);
      }
    } catch (err) {
      setLoading(false);
      message.error('서버에 문제가 있는 것 같아요! 사장님에게 문의해주세요.', 4);
      console.error(err);
    }
  }, [works, workId, isWorkChecked, mutateWorks]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleButtonClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Button
        type={isWorkChecked ? 'primary' : 'ghost'}
        disabled={!isWorkChecked || isWorkDone}
        size="large"
        onClick={handleButtonClick}
        block
      >
        완료
      </Button>
      <Modal
        visible={isModalOpen}
        onOk={deleteWork}
        onCancel={closeModal}
        okText="완료"
        cancelText="취소"
        confirmLoading={loading}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        업무를 완료 할까요?
      </Modal>
    </>
  );
};

export default DoneButton;
