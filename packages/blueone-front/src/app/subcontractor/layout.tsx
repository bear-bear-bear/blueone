'use client';
import { ReactNode, useEffect } from 'react';
import { App, Button, ConfigProvider, theme } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useUser from '@/hooks/use-user.hook';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import navItems, { type NavItem } from './nav-items';

export default function WorkerLayout({ children }: { children: ReactNode }) {
  const { message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn } = useUser({
    redirectTo: '/',
  });

  const headerText = navItems.find((item) => item.href === pathname)?.text;
  const bodyNoPadding = ['analysis', 'settings'].some((v) => pathname.endsWith(v));
  const showBack = ['done-works'].some((v) => pathname.endsWith(v));

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'contractor') {
      message.info('Subcontractor 전용 페이지입니다.');
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return null;
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App notification={{ maxCount: 1 }}>
        <Global styles={globalCSS} />

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
                  return <NavItem key={item.href} item={item} active={item.href === pathname || isParentOfCurrPage} />;
                })}
              </nav>
            </BoxFooter>
          </Box>
        </CenterLayout>
      </App>
    </ConfigProvider>
  );
}

function NavItem({ item, active }: { active: boolean; item: NavItem }) {
  return (
    <StyledLink href={item.href} passHref active={active}>
      {active ? item.fillIcon : item.outlineIcon}
      <p>{item.text}</p>
    </StyledLink>
  );
}

const globalCSS = css`
  body {
    background-color: #242424;
  }
`;

const CenterLayout = styled.section`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
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
  display: flex;
  flex-direction: column;
  padding: ${({ noPadding }) => (noPadding ? 'initial' : BOX_ITEM_PADDING)};
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoxFooter = styled.footer`
  nav {
    display: flex;
    justify-content: space-between;
    padding: ${BOX_ITEM_PADDING};
    background-color: #000;
  }
`;

const StyledLink = styled(Link)<{ active: boolean }>`
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
