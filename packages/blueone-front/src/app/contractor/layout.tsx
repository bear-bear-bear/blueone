'use client';
import { useState, ReactNode } from 'react';
import { Button, Layout, Menu, MenuProps, Tooltip } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSignOut } from '@/features/sign-out';
import { LogoutOutlined } from '@ant-design/icons';
import navItems, { getTitleByRoute } from './nav-items';

const { Content: Main, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function ContractorLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: signOut } = useSignOut();
  const [collapsed, setCollapsed] = useState(false);

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="lg">
        <div className="min-h-12 flex justify-center p-4">
          {collapsed ? (
            <Image src="/icon_white.svg" alt="로고" width={20} height={20} />
          ) : (
            <Image src="/logo_white.svg" alt="로고" width={100} height={20} />
          )}
        </div>

        <Menu
          theme="dark"
          defaultOpenKeys={['업무 관리']} // SubMenu
          selectedKeys={[pathname]} // MenuItem
          onClick={handleClickMenu}
          mode="inline"
          inlineIndent={16}
        >
          <Divider />

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
                  <Divider />
                </>
              );
            }

            return (
              <>
                <Menu.Item key={page.route} icon={page.icon} title={page.title}>
                  {page.title}
                </Menu.Item>
                <Divider />
              </>
            );
          })}
        </Menu>
      </Sider>

      <Layout>
        <Layout.Header className="flex justify-between items-center px-4 text-white">
          <h1>{getTitleByRoute(pathname)}</h1>

          <Tooltip title="로그아웃">
            <Button
              type="text"
              icon={<LogoutOutlined className="text-[22px]" />}
              onClick={() => signOut()}
              className="!text-white"
            />
          </Tooltip>
        </Layout.Header>

        <Main className="p-4 overflow-auto">{children}</Main>

        <Footer className="p-4 text-center">BLUEONE ©2014</Footer>
      </Layout>
    </Layout>
  );
}

function Divider() {
  return <Menu.Divider className="bg-gray-950 border-gray-950 text-gray-950" />;
}
