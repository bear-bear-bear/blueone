import { CarOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';

const pages = [
  {
    title: '업무 관리',
    icon: <CarOutlined />,
    children: [
      {
        title: '업무 목록',
        route: '/admin/works',
      },
      {
        title: '업무 등록',
        route: '/admin/add-work-for-mobile',
      },
    ],
  },
  {
    title: '기사 관리',
    route: '/admin/users',
    icon: <TeamOutlined />,
  },
  {
    title: '공지사항',
    route: '/admin/notice',
    icon: <NotificationOutlined />,
  },
] as const;

export default pages;

export function getTitleByRoute(route: string) {
  const page = pages.find((page) => {
    if ('children' in page) {
      return page.children.some((child) => child.route === route);
    }
    return page.route === route;
  });

  return page?.title;
}
