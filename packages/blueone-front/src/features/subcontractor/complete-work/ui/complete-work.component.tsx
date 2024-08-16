import { ReactElement } from 'react';
import { App, Modal } from 'antd';
import { Me, useSuspenseFetchMe } from '@/entities/me';
import type { Work } from '@/shared/api/types';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import useCompleteWork from '../api/use-complete-work.mutation';

type RenderProps = {
  complete: () => void;
  canComplete: boolean;
};
type Props = {
  work: Pick<Work, 'id' | 'checkTime' | 'endTime'>;
  children: (props: RenderProps) => ReactElement;
};

export default function CompleteWork({ work, children }: Props) {
  const { message } = App.useApp();
  const { mutate: completeWork, isPending } = useCompleteWork();
  const { data: me } = useSuspenseFetchMe();
  const insuranceInfo = Me.insuranceInfo(me);
  const { open: confirmOpen, onOpen: openConfirm, onClose: closeConfirm } = useDisclosure();

  const canComplete = insuranceInfo.state !== 'expired' && !!work.checkTime && !work.endTime;

  const complete = () => {
    if (!canComplete) return;

    completeWork(
      { workId: work.id },
      {
        onSuccess: () => {
          message.success('업무가 완료 처리 되었어요. 고생하셨습니다 :)');
          closeConfirm();

          // TODO: 자동 동작하는지 확인
          // if (nextWorks?.find((work) => work.endTime === null)) {
          //   message.success('완료된 업무는 완료되지 않은 업무 뒤쪽으로 배치되었어요.');
          // }
        },
      },
    );
  };

  return (
    <>
      {children({
        complete: openConfirm,
        canComplete,
      })}

      <Modal
        open={confirmOpen}
        onOk={complete}
        onCancel={closeConfirm}
        okText="완료"
        cancelText="취소"
        confirmLoading={isPending}
        centered
      >
        업무를 완료 할까요?
      </Modal>
    </>
  );
}
