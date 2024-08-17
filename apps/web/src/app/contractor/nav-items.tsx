import { MenuProps } from 'antd';
import Link from 'next/link';
import { CarOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';

const routeToLabelMap: Record<string, string> = {
  '/contractor/works': '업무 관리',
  '/contractor/subcontractors': '기사 관리',
  '/contractor/notices': '공지사항',
};

type MenuItem = Required<MenuProps>['items'][number];
const navItems: MenuItem[] = [
  {
    key: routeToLabelMap['/contractor/works'],
    label: <Link href="/contractor/works">{routeToLabelMap['/contractor/works']}</Link>,
    icon: <CarOutlined />,
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

// // For menu defaultOpenKeys
// type Modify<T, R> = Omit<T, keyof R> & R;
// const isGroup = (item: ItemType): item is Modify<MenuItemGroupType, { key: string }> => {
//   return !!item && 'children' in item && typeof item.key === 'string';
// };
// export const allGroupKeys = navItems.filter(isGroup).map((item) => item.key);
