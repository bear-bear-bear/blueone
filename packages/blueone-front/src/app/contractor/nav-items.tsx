import { CarOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';

const navItems = [
  {
    title: '업무 관리',
    icon: <CarOutlined />,
    children: [
      {
        title: '업무 목록',
        route: '/contractor/works',
      },
      {
        title: '업무 등록',
        route: '/contractor/add-work-for-mobile',
      },
    ],
  },
  {
    title: '기사 관리',
    route: '/contractor/users',
    icon: <TeamOutlined />,
  },
  {
    title: '공지사항',
    route: '/contractor/notices',
    icon: <NotificationOutlined />,
  },
] as const;

export default navItems;

export function getTitleByRoute(route: string) {
  let title = '';

  for (const page of navItems) {
    if ('children' in page) {
      for (const child of page.children) {
        if (child.route === route) {
          title = child.title;
          break;
        }
      }
    } else if (page.route === route) {
      title = page.title;
      break;
    }
  }

  return title;
}
