import { ComponentType } from 'react';
import NoticeBoard from './NoticeBoard';
import UserManagementList from './UserManagementList';
import WorkAddFormForMobile from './WorkAddFormForMobile';
import WorkManagementTable from './WorkManagementTable';

export type ContentTitle = '업무 목록' | '업무 등록' | '기사 관리' | '공지사항';
export type Content = {
  title: ContentTitle;
  component: ComponentType;
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
  {
    title: '공지사항',
    component: NoticeBoard,
  },
];

export default contentList;
