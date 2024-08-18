'use client';
import { Button, Divider, List } from 'antd';
import { AddSubcontractor } from '@/features/contractor/subcontractor/add';
import { useFetchSubcontractors } from '@/features/contractor/subcontractor/list';
import ListItem from './list-item.component';

export default function SubcontractorsManagementPage() {
  const { data: contractors, isPending } = useFetchSubcontractors();

  return (
    <div className="relative max-w-screen-lg max-h-[800px] overflow-y-auto px-4 pb-4 border border-gray-300 bg-white rounded">
      <header className="sticky top-0 z-10 flex justify-end bg-white py-4">
        <AddSubcontractor
          trigger={({ openModal, isPending }) => (
            <Button type="primary" onClick={openModal} loading={isPending}>
              등록
            </Button>
          )}
        />
      </header>

      <Divider className="mt-0 mb-4" />

      <List
        itemLayout="horizontal"
        dataSource={contractors}
        renderItem={(contractor) => <ListItem key={contractor.id} contractor={contractor} />}
        loading={isPending}
      />
    </div>
  );
}
