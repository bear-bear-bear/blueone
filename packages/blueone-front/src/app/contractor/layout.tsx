'use client';
import { useState, useCallback, ReactNode } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import type { SiderProps } from 'antd/lib/layout';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import useSWRImmutable from 'swr/immutable';
import SignOutButton from '@/components/sign-out-button.component';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import styled from '@emotion/styled';
import navItems, { getTitleByRoute } from './nav-items';

type Users = EndPoint['GET /users']['responses']['200'];

const { Content: Main, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function ContractorLayout({ children }: { children: ReactNode }) {
  // WorkManagementTable 에서 users 를 useSWRImmutable(revalidateOnMount: false)과 함께 사용하기 위한 initial fetch
  useSWRImmutable<Users>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse: SiderProps['onCollapse'] = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} breakpoint="lg">
        <LogoWrapper>
          {collapsed ? (
            <Image src="/icon_white.svg" alt="로고" width={20} height={20} />
          ) : (
            <Image src="/logo_white.svg" alt="로고" width={100} height={20} />
          )}
        </LogoWrapper>

        <Menu
          theme="dark"
          defaultOpenKeys={['업무 관리']} // SubMenu
          selectedKeys={[pathname]} // MenuItem
          onClick={handleClickMenu}
          mode="inline"
        >
          <StyledMenuDevider />

          {navItems.map((page) => {
            if ('children' in page) {
              return (
                <>
                  <SubMenu key={page.title} icon={page.icon} title={page.title}>
                    {page.children.map((child) => (
                      <Menu.Item key={child.route} title={child.title}>
                        {child.title}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                  <StyledMenuDevider />
                </>
              );
            }

            return (
              <>
                <Menu.Item key={page.route} icon={page.icon} title={page.title}>
                  {page.title}
                </Menu.Item>
                <StyledMenuDevider />
              </>
            );
          })}
        </Menu>
      </Sider>

      <Layout>
        <StyledHeader>
          {getTitleByRoute(pathname)}
          <SignOutButton style={{ color: 'white' }} />
        </StyledHeader>

        <Main style={{ margin: '16px', overflow: 'auto' }}>{children}</Main>

        <Footer style={{ textAlign: 'center', padding: '16px 0' }}>BLUEONE ©2014</Footer>
      </Layout>
    </Layout>
  );
}

const StyledHeader = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: #fff;
`;

const StyledMenuDevider = styled(Menu.Divider)`
  background-color: #000810 !important;
  border-color: #000810 !important;
  color: #000810 !important;
`;

const LogoWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: 16px;
  min-height: 52px;
`;
