import { useState } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { FullUsers, FullUser } from '@/app/contractor/users/page';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type DeletedUser = EndPoint['DELETE /users/{userId}']['responses']['200'];

type Props = {
  user: FullUser;
};

export default function DeleteButton({ user }: Props) {
  const { message } = App.useApp();
  const { data: users, mutate: mutateUsers } = useSWRImmutable<FullUsers>('/users', axiosFetcher);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const deleteWork = async () => {
    try {
      const deletedUser = await httpClient.delete<DeletedUser>(`/users/${user.id}`).then((res) => res.data);
      const nextUsers = users?.filter((prevUser) => prevUser.id !== deletedUser.id);
      await mutateUsers(nextUsers);
      message.success('기사 정보 삭제 완료');
    } catch (err) {
      throw err;
    }

    setIsPopoverOpen(false);
  };

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title="기사 정보 삭제"
        open={isPopoverOpen}
        onConfirm={deleteWork}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined className="!text-red-500" />}
        placement="bottom"
      >
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="!text-red-500"
            onClick={showPopconfirm}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
}
