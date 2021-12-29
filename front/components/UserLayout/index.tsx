import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CarOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';
import * as S from './styles';
import 'antd/dist/antd.dark.css';
import { useMemo } from 'react';

const navItems = [
  {
    href: '/worker',
    icon: <CarOutlined style={{ fontSize: 20 }} />,
    text: '업무',
  },
  {
    href: '/worker/notice',
    icon: <NotificationOutlined style={{ fontSize: 20 }} />,
    text: '공지사항',
  },
  {
    href: '/worker/setting',
    icon: <SettingOutlined style={{ fontSize: 20 }} />,
    text: '설정',
  },
];

const UserLayout: FC = ({ children }) => {
  const router = useRouter();

  const currHeader = useMemo(() => navItems.find((item) => item.href === router.asPath)!.text, [router.asPath]);

  return (
    <S.CenterLayout>
      <S.Box>
        <S.BoxHeader>{currHeader}</S.BoxHeader>
        <S.BoxMain>{children}</S.BoxMain>
        <S.BoxFooter>
          <nav>
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <a>
                  <div>
                    {item.icon}
                    <p>{item.text}</p>
                  </div>
                </a>
              </Link>
            ))}
          </nav>
        </S.BoxFooter>
      </S.Box>
    </S.CenterLayout>
  );
};

export default UserLayout;
