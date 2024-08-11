import { useMemo, ReactNode } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiFillCar,
  AiFillNotification,
  AiFillSetting,
  AiOutlineBarChart,
  AiOutlineCar,
  AiOutlineNotification,
  AiOutlineSetting,
} from 'react-icons/ai';
import { ArrowLeftOutlined } from '@ant-design/icons';
import * as S from './styles';

type NavItem = {
  href: `/${string}`;
  parentPageHref?: `/${string}`;
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
    href: '/worker/done-work-search',
    parentPageHref: '/worker',
    outlineIcon: null,
    fillIcon: null,
    text: '완료된 업무',
  },
  {
    href: '/worker/notice',
    outlineIcon: <AiOutlineNotification size={20} />,
    fillIcon: <AiFillNotification size={20} />,
    text: '공지사항',
  },
  {
    href: '/worker/analysis',
    outlineIcon: <AiOutlineBarChart size={20} />,
    fillIcon: <AiOutlineBarChart size={20} />,
    text: '지수 분석',
  },
  {
    href: '/worker/setting',
    outlineIcon: <AiOutlineSetting size={20} />,
    fillIcon: <AiFillSetting size={20} />,
    text: '설정',
  },
];

const ActiveLink = ({ item, active }: { active: boolean; item: NavItem }) => (
  <Link href={item.href} passHref>
    <S.ActiveAnchor active={active}>
      {active ? item.fillIcon : item.outlineIcon}
      <p>{item.text}</p>
    </S.ActiveAnchor>
  </Link>
);

type Props = {
  children: ReactNode;
  bodyNoPadding?: boolean;
  useBack?: boolean;
};
const UserLayout = ({ children, bodyNoPadding, useBack = false }: Props) => {
  const router = useRouter();
  const headerText = useMemo(() => navItems.find((item) => item.href === router.asPath)?.text, [router.asPath]);

  const goBack = () => {
    router.back();
  };

  return (
    <S.CenterLayout>
      <S.Box>
        <S.BoxHeader>
          {useBack && (
            <Button className="go-back" type="text" size="large" icon={<ArrowLeftOutlined />} onClick={goBack} />
          )}
          <h1>{headerText}</h1>
        </S.BoxHeader>
        <S.BoxMain noPadding={bodyNoPadding}>{children}</S.BoxMain>
        <S.BoxFooter>
          <nav>
            {navItems.map((item) => {
              if (item.parentPageHref) {
                return null;
              }
              // Warning: O(n^2)
              const isParentOfCurrPage = !!navItems.find(
                (t) =>
                  t.parentPageHref && //
                  t.parentPageHref === item.href && //
                  t.href === router.asPath, //
              );
              return (
                <ActiveLink key={item.href} item={item} active={item.href === router.asPath || isParentOfCurrPage} />
              );
            })}
          </nav>
        </S.BoxFooter>
      </S.Box>
    </S.CenterLayout>
  );
};

export default UserLayout;
