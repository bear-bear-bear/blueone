import useSWR from 'swr';
import { List, Spin } from 'antd';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import UserItem from './UserItem';
import * as S from './styles';

export type Response = EndPoint['GET /users']['responses']['200'];

const UserList = () => {
  const { data: users } = useSWR<Response>('/users', axiosFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
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
      <List itemLayout="horizontal" dataSource={users} renderItem={UserItem} />
    </S.ListWrapper>
  );
};

export default UserList;
