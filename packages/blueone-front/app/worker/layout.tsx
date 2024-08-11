'use client';
import { ReactNode, useEffect } from 'react';
import { Button, message } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import useUser from '@hooks/useUser';
import navItems, { NavItem } from './nav-items';

export default function WorkerLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn } = useUser({
    redirectTo: '/',
  });

  const headerText = navItems.find((item) => item.href === pathname)?.text;
  const bodyNoPadding = ['analysis', 'setting'].some((v) => pathname.endsWith(v));
  const showBack = ['done-works'].some((v) => pathname.endsWith(v));

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      message.info('유저 전용 페이지입니다.');
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return null;
  return (
    <CenterLayout>
      <Box>
        <BoxHeader>
          {showBack && (
            <Button className="go-back" type="text" size="large" icon={<ArrowLeftOutlined />} onClick={goBack} />
          )}
          <h1>{headerText}</h1>
        </BoxHeader>
        <BoxMain noPadding={bodyNoPadding}>{children}</BoxMain>
        <BoxFooter>
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
                  t.href === pathname, //
              );
              return <ActiveLink key={item.href} item={item} active={item.href === pathname || isParentOfCurrPage} />;
            })}
          </nav>
        </BoxFooter>
      </Box>
    </CenterLayout>
  );
}

function ActiveLink({ item, active }: { active: boolean; item: NavItem }) {
  return (
    <Link href={item.href} passHref>
      <ActiveAnchor active={active}>
        {active ? item.fillIcon : item.outlineIcon}
        <p>{item.text}</p>
      </ActiveAnchor>
    </Link>
  );
}

const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
`;

const BOX_ITEM_PADDING = '0.66rem 1rem';

const Box = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoxHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.33rem;
  padding: ${BOX_ITEM_PADDING};
  padding-top: 1rem;
  gap: 1rem;

  button.go-back {
    position: absolute;
    left: 1rem;
    color: #fff;
  }

  h1 {
    font-size: 1.33rem;
    font-weight: 400;
    color: #fff;
  }
`;

const BoxMain = styled.main<{ noPadding?: boolean }>`
  flex: 1;
  padding: ${({ noPadding }) => (noPadding ? 'initial' : BOX_ITEM_PADDING)};
  position: relative;
  overflow-y: auto;
`;

const BoxFooter = styled.footer`
  nav {
    display: flex;
    justify-content: space-between;
    padding: ${BOX_ITEM_PADDING};
    background-color: #000;
  }
`;

const ActiveAnchor = styled.a<{ active: boolean }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0.33rem;
  color: ${({ active }) => (active ? '#fff' : '#aaa')} !important;

  p {
    font-size: 14px;
    font-weight: 100;
    text-align: center;
  }
`;
