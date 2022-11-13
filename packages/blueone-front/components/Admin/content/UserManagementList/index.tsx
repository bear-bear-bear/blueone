import { List } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Unpacked } from '@typings';
import { axiosFetcher } from '@utils/swr';
import AddButton from './AddButton';
import UserItem from './UserItem';
import * as S from './styles';

export type FullUsers = EndPoint['GET /users']['responses']['200'];
export type FullUser = Unpacked<FullUsers>;

const UserManagementList = () => {
  const { data: users } = useSWRImmutable<FullUsers>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

  return (
    <S.ListWrapper>
      <S.StickyHeader>
        <AddButton />
      </S.StickyHeader>
      <S.StyledDivider />
      <List itemLayout="horizontal" dataSource={users} renderItem={UserItem} loading={!users} />
    </S.ListWrapper>
  );
};

export default UserManagementList;
