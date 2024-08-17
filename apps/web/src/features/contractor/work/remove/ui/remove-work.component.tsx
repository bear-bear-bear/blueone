import { ReactElement } from 'react';
import { App, Popconfirm } from 'antd';
import { Work } from '@/shared/api/types';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import { QuestionCircleOutlined } from '@ant-design/icons';
import useRemoveWork from '../api/use-remove-work.mutation';

type TriggerProps = {
  openPopConfirm: () => void;
  isPending: boolean;
};
type Props = {
  id: Work['id'];
  trigger: (props: TriggerProps) => ReactElement;
};

export default function RemoveWork({ id, trigger }: Props) {
  const { message } = App.useApp();
  const { mutate: removeWork, isPending } = useRemoveWork();
  const { open: confirmOpen, onOpen: openConfirm, onClose: closeConfirm } = useDisclosure();

  const remove = () => {
    removeWork(
      { workId: id },
      {
        onSuccess: () => {
          message.success('업무 삭제 완료');
          closeConfirm();
        },
      },
    );
  };

  return (
    <Popconfirm
      title="업무 완전히 삭제"
      open={confirmOpen}
      onConfirm={remove}
      okText="삭제"
      okButtonProps={{ danger: true }}
      onCancel={closeConfirm}
      cancelText="취소"
      icon={<QuestionCircleOutlined className="!text-red-500" />}
      placement="bottom"
    >
      {trigger({
        openPopConfirm: openConfirm,
        isPending,
      })}
    </Popconfirm>
  );
}
