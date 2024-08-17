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
    outlineIcon: <CarOutlined className="text-[20px]" />,
    fillIcon: <CarFilled className="text-[20px]" />,
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
    outlineIcon: <NotificationOutlined className="text-[20px]" />,
    fillIcon: <NotificationFilled className="text-[20px]" />,
    text: '공지사항',
  },
  {
    href: '/subcontractor/analysis',
    outlineIcon: <BarChartOutlined className="text-[20px]" />,
    fillIcon: <BarChartOutlined className="text-[20px]" />,
    text: '지수 분석',
  },
  {
    href: '/subcontractor/settings',
    outlineIcon: <SettingOutlined className="text-[20px]" />,
    fillIcon: <SettingFilled className="text-[20px]" />,
    text: '설정',
  },
];

export default navItems;
