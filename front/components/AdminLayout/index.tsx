import { useState, FC, useCallback } from 'react';
import Image from 'next/image';
import { Layout, Menu, MenuProps } from 'antd';
import type { SiderProps } from 'antd/lib/layout';
import { TeamOutlined, CarOutlined } from '@ant-design/icons';
import * as S from './styles';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>('업무 목록');

  const onCollapse: SiderProps['onCollapse'] = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleClick: MenuProps['onClick'] = useCallback((e) => {
    setSelectedKey(e.key);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} breakpoint="lg">
        <S.LogoWrapper>
          {collapsed ? (
            <Image src="/icon_white.svg" alt="로고" width={20} height={20} />
          ) : (
            <Image src="/logo_white.svg" alt="로고" width={100} height={20} />
          )}
        </S.LogoWrapper>

        <Menu
          theme="dark"
          onClick={handleClick}
          defaultOpenKeys={['업무 관리']} // SubMenu
          selectedKeys={[selectedKey]} // MenuItem
          mode="inline"
        >
          {/* <Menu.Item key="10">Option 2</Menu.Item> */}
          <Menu.Divider style={{ backgroundColor: '#000810' }} />
          <SubMenu key="업무 관리" icon={<CarOutlined />} title="업무 관리">
            <Menu.Item key="업무 목록">업무 목록</Menu.Item>
            <Menu.Item key="업무 추가">업무 추가</Menu.Item>
          </SubMenu>
          <Menu.Divider style={{ backgroundColor: '#000810' }} />
          <SubMenu key="기사 관리" icon={<TeamOutlined />} title="기사 관리">
            <Menu.Item key="기사 목록">기사 목록</Menu.Item>
            <Menu.Item key="기사 추가">기사 추가</Menu.Item>
          </SubMenu>
          <Menu.Divider style={{ backgroundColor: '#000810' }} />
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header style={{ color: 'white', padding: '0 16px' }}>{selectedKey}</Header>

        <Content style={{ margin: '16px' }}>컨텐츠</Content>

        <Footer style={{ textAlign: 'center', padding: '16px 0' }}>BLUEONE ©2014</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
