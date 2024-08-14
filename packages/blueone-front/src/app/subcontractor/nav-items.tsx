import { ReactNode } from 'react';
import {
  AiFillCar,
  AiFillNotification,
  AiFillSetting,
  AiOutlineBarChart,
  AiOutlineCar,
  AiOutlineNotification,
  AiOutlineSetting,
} from 'react-icons/ai';

export type NavItem = {
  href: `/${string}`;
  parentPageHref?: `/${string}`;
  outlineIcon: ReactNode;
  fillIcon: ReactNode;
  text: string;
};

const navItems: NavItem[] = [
  {
    href: '/subcontractor',
    outlineIcon: <AiOutlineCar size={20} />,
    fillIcon: <AiFillCar size={20} />,
    text: '업무',
  },
  {
    href: '/subcontractor/done-works',
    parentPageHref: '/subcontractor',
    outlineIcon: null,
    fillIcon: null,
    text: '완료된 업무',
  },
  {
    href: '/subcontractor/notices',
    outlineIcon: <AiOutlineNotification size={20} />,
    fillIcon: <AiFillNotification size={20} />,
    text: '공지사항',
  },
  {
    href: '/subcontractor/analysis',
    outlineIcon: <AiOutlineBarChart size={20} />,
    fillIcon: <AiOutlineBarChart size={20} />,
    text: '지수 분석',
  },
  {
    href: '/subcontractor/settings',
    outlineIcon: <AiOutlineSetting size={20} />,
    fillIcon: <AiFillSetting size={20} />,
    text: '설정',
  },
];

export default navItems;
