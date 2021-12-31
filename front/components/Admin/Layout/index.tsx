import { useState, FC, useCallback } from 'react';
import Image from 'next/image';
import { Layout, Empty, Menu, MenuProps } from 'antd';
import type { SiderProps } from 'antd/lib/layout';
import { TeamOutlined, CarOutlined, NotificationOutlined } from '@ant-design/icons';
import contentList, { ContentTitle } from '@components/Admin/content';
import * as S from './styles';

const { Header, Content: Main, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const EmptyContent = () => (
  <Empty
    style={{ margin: '64px 0' }}
    description={<p>선택된 항목에 컨텐츠가 설정되지 않았습니다. 개발자에게 문의하세요.</p>}
  />
);

const AdminLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<ContentTitle>('업무 목록');
  const SelectedContent = contentList.find((v) => v.title === selectedKey)?.component;

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
          <S.StyledMenuDevider />
          <SubMenu key="업무 관리" icon={<CarOutlined />} title="업무 관리">
            <Menu.Item key="업무 목록">업무 목록</Menu.Item>
            <Menu.Item key="업무 추가">업무 추가</Menu.Item>
          </SubMenu>
          <S.StyledMenuDevider />
          <Menu.Item key="기사 관리" icon={<TeamOutlined />} title="기사 관리">
            기사 관리
          </Menu.Item>
          <S.StyledMenuDevider />
          <Menu.Item key="공지사항" icon={<NotificationOutlined />} title="공지사항">
            공지사항
          </Menu.Item>
          <S.StyledMenuDevider />
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header style={{ color: 'white', padding: '0 16px' }}>{selectedKey}</Header>

        <Main style={{ margin: '16px', overflow: 'auto' }}>
          {SelectedContent ? <SelectedContent /> : <EmptyContent />}
        </Main>

        <Footer style={{ textAlign: 'center', padding: '16px 0' }}>BLUEONE ©2014</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
