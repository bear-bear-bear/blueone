import { ReactNode, useCallback, useState } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { FullUsers, FullUser } from '@/app/contractor/users/page';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type Props = {
  user: FullUser;
};
type DeletedUser = EndPoint['DELETE /users/{userId}']['responses']['200'];

const Spinner = <LoadingOutlined style={{ fontSize: 12 }} spin />;

const INITIAL_POPOVER_TEXT = '기사 정보 삭제';

const DeleteButton = ({ user }: Props) => {
  const { message } = App.useApp();
  const { data: users, mutate: mutateUsers } = useSWRImmutable<FullUsers>('/users', axiosFetcher);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popoverText, setPopoverText] = useState<ReactNode>(INITIAL_POPOVER_TEXT);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const deleteWork = useCallback(async () => {
    setPopoverText(Spinner);

    try {
      const deletedUser = await httpClient.delete<DeletedUser>(`/users/${user.id}`).then((res) => res.data);
      const nextUsers = users?.filter((prevUser) => prevUser.id !== deletedUser.id);
      await mutateUsers(nextUsers);
      message.success('기사 정보 삭제 완료');
    } catch (err) {
      throw err;
    }

    setIsPopoverOpen(false);
    setPopoverText(INITIAL_POPOVER_TEXT);
  }, [users, user, mutateUsers]);

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title={popoverText}
        open={isPopoverOpen}
        onConfirm={deleteWork}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />}
      >
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            style={{ color: '#ff4d4f' }}
            onClick={showPopconfirm}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
};

export default DeleteButton;
