'use client';
import { Divider, List } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Unpacked } from '@typings';
import styled from '@emotion/styled';
import { axiosFetcher } from '@utils/swr';
import AddButton from './AddButton';
import UserItem from './UserItem';

export type FullUsers = EndPoint['GET /users']['responses']['200'];
export type FullUser = Unpacked<FullUsers>;

export default function UsersPage() {
  const { data: users } = useSWRImmutable<FullUsers>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

  return (
    <ListWrapper>
      <StickyHeader>
        <AddButton />
      </StickyHeader>
      <StyledDivider />
      <List itemLayout="horizontal" dataSource={users} renderItem={UserItem} loading={!users} />
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  position: relative;
  max-width: 800px;
  max-height: 800px;
  overflow-y: auto;
  padding: 0 16px 16px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;

  ::-webkit-scrollbar {
    width: 10px;

    &-track {
      border: 1px solid #eee;
    }

    &-thumb {
      background: #ccc;
    }
  }
`;

const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 16px 8px 8px;
  background-color: inherit;
`;

const StyledDivider = styled(Divider)`
  margin: 8px 0;
`;
