import { ReactNode } from 'react';
import {
  BarChartOutlined,
  CarFilled,
  CarOutlined,
  NotificationFilled,
  NotificationOutlined,
  SettingFilled,
  SettingOutlined,
} from '@ant-design/icons';

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
    outlineIcon: <CarOutlined size={20} />,
    fillIcon: <CarFilled size={20} />,
    text: '업무',
  },
  {
    href: '/subcontractor/completed-works',
    parentPageHref: '/subcontractor',
    outlineIcon: null,
    fillIcon: null,
    text: '완료된 업무',
  },
  {
    href: '/subcontractor/notices',
    outlineIcon: <NotificationOutlined size={20} />,
    fillIcon: <NotificationFilled size={20} />,
    text: '공지사항',
  },
  {
    href: '/subcontractor/analysis',
    outlineIcon: <BarChartOutlined size={20} />,
    fillIcon: <BarChartOutlined size={20} />,
    text: '지수 분석',
  },
  {
    href: '/subcontractor/settings',
    outlineIcon: <SettingOutlined size={20} />,
    fillIcon: <SettingFilled size={20} />,
    text: '설정',
  },
];

export default navItems;
