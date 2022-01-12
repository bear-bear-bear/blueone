import { FC } from 'react';
import WorkManagementTable from './WorkManagementTable';
import WorkAddFormForMobile from './WorkAddFormForMobile';
import UserManagementList from './UserManagementList';

export type ContentTitle = '업무 목록' | '업무 등록' | '기사 관리' | '공지사항';
export type Content = {
  title: ContentTitle;
  component: FC;
};

const contentList: Content[] = [
  {
    title: '업무 목록',
    component: WorkManagementTable,
  },
  {
    title: '업무 등록',
    component: WorkAddFormForMobile,
  },
  {
    title: '기사 관리',
    component: UserManagementList,
  },
  // {
  //   title: '공지사항',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
];

export default contentList;
