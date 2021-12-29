import { FC } from 'react';
import WorkList from './WorkList';
import WorkAddForm from '@components/AdminContent/WorkAddForm';

export type ContentTitle = '업무 목록' | '업무 추가' | '기사 목록' | '기사 추가' | '공지사항';
export type Content = {
  title: ContentTitle;
  component: FC;
};

const contentList: Content[] = [
  {
    title: '업무 목록',
    component: WorkList,
  },
  {
    title: '업무 추가',
    component: WorkAddForm,
  },
  // {
  //   title: '기사 목록',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
  // {
  //   title: '기사 추가',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
  // {
  //   title: '공지사항',
  //   component: () => <div>임시 컨텐츠</div>,
  // },
];

export default contentList;
