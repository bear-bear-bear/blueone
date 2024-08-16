import { ReactElement } from 'react';
import { App, Popconfirm } from 'antd';
import { Notice } from '@/shared/api/types';
import { useDisclosure } from '@/shared/lib/hooks/use-disclosure.hook';
import { QuestionCircleOutlined } from '@ant-design/icons';
import useRemoveNotice from '../api/use-remove-notice.mutation';

type TriggerProps = {
  openPopConfirm: () => void;
  isPending: boolean;
};
type Props = {
  id: Notice['id'];
  trigger: (props: TriggerProps) => ReactElement;
};

export default function RemoveNotice({ id, trigger }: Props) {
  const { message } = App.useApp();
  const { mutate: removeNotice, isPending } = useRemoveNotice();
  const { open: confirmOpen, onOpen: openConfirm, onClose: closeConfirm } = useDisclosure();

  const remove = () => {
    removeNotice(
      { noticeId: id },
      {
        onSuccess: () => {
          message.success('공지사항 삭제 완료');
          closeConfirm();
        },
      },
    );
  };

  return (
    <Popconfirm
      title="공지사항 삭제"
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
