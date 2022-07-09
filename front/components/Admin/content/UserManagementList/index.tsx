import { List, Spin } from 'antd';
import useSWRImmutable from 'swr/immutable';

import AddButton from './AddButton';
import UserItem from './UserItem';
import * as S from './styles';

import type { EndPoint, Unpacked } from '@typings';
import { axiosFetcher } from '@utils/swr';

export type FullUsers = EndPoint['GET /users']['responses']['200'];
export type FullUser = Unpacked<FullUsers>;

const UserManagementList = () => {
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

export default UserManagementList;
