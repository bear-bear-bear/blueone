import { MenuProps } from 'antd';
import { ItemType, MenuItemGroupType } from 'antd/es/menu/interface';
import Link from 'next/link';
import { CarOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';

const routeToLabelMap: Record<string, string> = {
  '/contractor/works': '업무 목록',
  '/contractor/add-work-for-mobile': '업무 등록',
  '/contractor/subcontractors': '기사 관리',
  '/contractor/notices': '공지사항',
};

type MenuItem = Required<MenuProps>['items'][number];
const navItems: MenuItem[] = [
  {
    type: 'divider',
  },
  {
    key: '업무 관리',
    label: '업무 관리',
    icon: <CarOutlined />,
    children: [
      {
        key: routeToLabelMap['/contractor/works'],
        label: <Link href="/contractor/works">{routeToLabelMap['/contractor/works']}</Link>,
      },
      {
        key: routeToLabelMap['/contractor/add-work-for-mobile'],
        label: <Link href="/contractor/add-work-for-mobile">{routeToLabelMap['/contractor/add-work-for-mobile']}</Link>,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: routeToLabelMap['/contractor/subcontractors'],
    label: <Link href="/contractor/subcontractors">{routeToLabelMap['/contractor/subcontractors']}</Link>,
    icon: <TeamOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: routeToLabelMap['/contractor/notices'],
    label: <Link href="/contractor/notices">{routeToLabelMap['/contractor/notices']}</Link>,
    icon: <NotificationOutlined />,
  },
  {
    type: 'divider',
  },
];

export default navItems;

export const getPageHeadingByPathname = (pathname: string) => routeToLabelMap[pathname];
export const getMenuKeyByPathname = (pathname: string) => routeToLabelMap[pathname];

type Modify<T, R> = Omit<T, keyof R> & R;
const isGroup = (item: ItemType): item is Modify<MenuItemGroupType, { key: string }> => {
  return !!item && 'children' in item && typeof item.key === 'string';
};
export const allGroupKeys = navItems.filter(isGroup).map((item) => item.key);
