import { ReactNode, useCallback, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import httpClient from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { FullUsers, FullUser } from './index';

type Props = {
  user: FullUser;
};
type DeletedUser = EndPoint['DELETE /users/{UserId}']['responses']['200'];

const Spinner = <LoadingOutlined style={{ fontSize: 12 }} spin />;

const DeleteButton = ({ user }: Props) => {
  const INITIAL_POPOVER_TEXT = '유저 삭제';
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
      const nextUsers = users!.filter((user) => user.id !== deletedUser.id);
      await mutateUsers(nextUsers);
      message.success('유저 삭제 완료');
    } catch (err) {
      message.error('유저 삭제 중 에러 발생, 개발자에게 문의하세요.');
      console.error(err);
    }

    setIsPopoverOpen(false);
    setPopoverText(INITIAL_POPOVER_TEXT);
  }, [user, mutateUsers]);

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title={popoverText}
        visible={isPopoverOpen}
        onConfirm={deleteWork}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
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
