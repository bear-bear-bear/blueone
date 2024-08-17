import { ReactElement } from 'react';
import { App, Popconfirm } from 'antd';
import { User } from '@/shared/api/types';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import { QuestionCircleOutlined } from '@ant-design/icons';
import useRemoveSubcontractor from '../api/use-remove-subcontractor.mutation';

type TriggerProps = {
  openPopConfirm: () => void;
  isPending: boolean;
};
type Props = {
  id: User['id'];
  trigger: (props: TriggerProps) => ReactElement;
};

export default function RemoveSubcontractor({ id, trigger }: Props) {
  const { message } = App.useApp();
  const { mutate: removeSubcontractor, isPending } = useRemoveSubcontractor();
  const { open: confirmOpen, onOpen: openConfirm, onClose: closeConfirm } = useDisclosure();

  const remove = () => {
    removeSubcontractor(
      { userId: id },
      {
        onSuccess: () => {
          message.success('기사 정보 삭제 완료');
          closeConfirm();
        },
      },
    );
  };

  return (
    <Popconfirm
      title="기사 정보 삭제"
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
