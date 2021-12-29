import { FC } from 'react';
import WorkTable from './WorkTable';
import WorkAddForm from '@components/AdminContent/WorkAddForm';

export type ContentTitle = '업무 목록' | '업무 추가' | '기사 관리' | '공지사항';
export type Content = {
  title: ContentTitle;
  component: FC;
};

const contentList: Content[] = [
  {
    title: '업무 목록',
    component: WorkTable,
  },
  {
    title: '업무 추가',
    component: WorkAddForm,
  },
  // {
  //   title: '기사 관리',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
  // {
  //   title: '공지사항',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
];

export default contentList;
