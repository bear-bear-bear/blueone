'use client';
import { Divider, List } from 'antd';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Unpacked } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import AddButton from './add-button.component';
import ListItem from './list-item.component';

export type FullUsers = EndPoint['GET /users']['responses']['200'];
export type FullUser = Unpacked<FullUsers>;

export default function UsersPage() {
  const { data: users } = useSWRImmutable<FullUsers>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

  return (
    <div className="relative max-w-screen-lg max-h-[800px] overflow-y-auto p-4 border border-gray-300 bg-white rounded">
      <header className="sticky top-0 z-10 flex justify-end bg-white">
        <AddButton />
      </header>
      <Divider className="my-4" />
      <List itemLayout="horizontal" dataSource={users} renderItem={ListItem} loading={!users} />
    </div>
  );
}
