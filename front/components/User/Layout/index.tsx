import { useMemo, FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiFillCar,
  AiFillNotification,
  AiFillSetting,
  AiOutlineCar,
  AiOutlineNotification,
  AiOutlineSetting,
} from 'react-icons/ai';
import { RiBitCoinFill, RiBitCoinLine } from 'react-icons/ri';
import * as S from './styles';

type NavItem = {
  href: `/${string}`;
  outlineIcon: ReactNode;
  fillIcon: ReactNode;
  text: string;
};
const navItems: NavItem[] = [
  {
    href: '/worker',
    outlineIcon: <AiOutlineCar size={20} />,
    fillIcon: <AiFillCar size={20} />,
    text: '업무',
  },
  {
    href: '/worker/notice',
    outlineIcon: <AiOutlineNotification size={20} />,
    fillIcon: <AiFillNotification size={20} />,
    text: '공지사항',
  },
  {
    href: '/worker/analysis',
    outlineIcon: <RiBitCoinLine size={20} />,
    fillIcon: <RiBitCoinFill size={20} />,
    text: '지수 분석',
  },
  {
    href: '/worker/setting',
    outlineIcon: <AiOutlineSetting size={20} />,
    fillIcon: <AiFillSetting size={20} />,
    text: '설정',
  },
];

const ActiveLink: FC<{ active: boolean; item: NavItem }> = ({ item, active }) => (
  <Link href={item.href} passHref>
    <S.ActiveAnchor active={active}>
      {active ? item.fillIcon : item.outlineIcon}
      <p>{item.text}</p>
    </S.ActiveAnchor>
  </Link>
);

const UserLayout: FC<{ bodyNoPadding?: boolean }> = ({ children, bodyNoPadding }) => {
  const router = useRouter();

  const headerText = useMemo(() => navItems.find((item) => item.href === router.asPath)!.text, [router.asPath]);

  return (
    <S.CenterLayout>
      <S.Box>
        <S.BoxHeader>
          <h1>{headerText}</h1>
        </S.BoxHeader>
        <S.BoxMain noPadding={bodyNoPadding}>{children}</S.BoxMain>
        <S.BoxFooter>
          <nav>
            {navItems.map((item) => (
              <ActiveLink key={item.href} item={item} active={item.href === router.asPath} />
            ))}
          </nav>
        </S.BoxFooter>
      </S.Box>
    </S.CenterLayout>
  );
};

export default UserLayout;
