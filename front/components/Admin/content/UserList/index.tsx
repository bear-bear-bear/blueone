import useSWRImmutable from 'swr/immutable';
import { List, Spin } from 'antd';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint, Unpacked } from '@typings';
import UserItem from './UserItem';
import AddButton from './AddButton';
import * as S from './styles';

export type FullUsers = EndPoint['GET /users']['responses']['200'];
export type FullUser = Unpacked<FullUsers>;

const UserList = () => {
  const { data: users } = useSWRImmutable<FullUsers>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

  if (!users) {
    return (
      <S.SpinnerWrapper>
        <Spin size="default" />
      </S.SpinnerWrapper>
    );
  }
  return (
    <S.ListWrapper>
      <S.StickyHeader>
        <AddButton />
      </S.StickyHeader>
      <S.StyledDivider />
      <List itemLayout="horizontal" dataSource={users} renderItem={UserItem} />
    </S.ListWrapper>
  );
};

export default UserList;
