import { useState, FC, useCallback } from 'react';

import { TeamOutlined, CarOutlined, NotificationOutlined } from '@ant-design/icons';

import { Layout, Empty, Menu, MenuProps } from 'antd';
import type { SiderProps } from 'antd/lib/layout';
import Image from 'next/image';
import useSWRImmutable from 'swr/immutable';

import * as S from './styles';

import contentList, { ContentTitle } from '@components/Admin/content';
import LogoutButton from '@components/LogoutButton';
import type { EndPoint } from '@typings';
import { axiosFetcher } from '@utils/swr';

type Users = EndPoint['GET /users']['responses']['200'];

const { Content: Main, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const EmptyContent = () => (
  <Empty
    style={{ margin: '64px 0' }}
    description={<p>선택된 항목에 컨텐츠가 설정되지 않았습니다. 개발자에게 문의하세요.</p>}
  />
);

const AdminLayout: FC = () => {
  // WorkManagementTable 에서 users 를 useSWRImmutable(revalidateOnMount: false)과 함께 사용하기 위한 initial fetch
  useSWRImmutable<Users>('/users', axiosFetcher, {
    revalidateOnMount: true,
  });

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
            <Menu.Item key="업무 등록">업무 등록</Menu.Item>
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
        <S.StyledHeader>
          {selectedKey}
          <LogoutButton style={{ color: 'white' }} />
        </S.StyledHeader>

        <Main style={{ margin: '16px', overflow: 'auto' }}>
          {SelectedContent ? <SelectedContent /> : <EmptyContent />}
        </Main>

        <Footer style={{ textAlign: 'center', padding: '16px 0' }}>BLUEONE ©2014</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
