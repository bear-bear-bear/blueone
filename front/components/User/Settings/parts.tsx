import type { FC } from 'react';
import { Avatar, Card, Skeleton, Space } from 'antd';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import processPhoneNumber from '@utils/processPhoneNumber';
import type { UserWithInfo } from '@components/User/Settings/index';
import * as S from './styles';

export const SettingsSkeleton = () => (
  <div style={{ padding: '1.66rem 1rem' }}>
    <Space size="large" direction="vertical" style={{ width: '100%' }}>
      <Skeleton active avatar title={false} />
      <Skeleton active title={false} paragraph={{ rows: 2, width: '100%' }} />
      <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} />
    </Space>
  </div>
);

export const SettingsHeader: FC<{ user: UserWithInfo }> = ({ user }) => (
  <S.StyledCard>
    <Card.Meta
      avatar={<Avatar icon={<UserOutlined />} size={45} style={{ backgroundColor: '#00598d' }} />}
      title={user.UserInfo?.realname || 'Admin'}
      description={
        <>
          <PhoneOutlined style={{ transform: 'rotateY(180deg)', marginRight: '0.3rem' }} />
          <span>{processPhoneNumber(user.phoneNumber)}</span>
        </>
      }
    />
  </S.StyledCard>
);

export const SettingsFooter: FC = () => <S.Footer>Copyright ©2014-2022 Blueone, Inc. All rights reserved.</S.Footer>;
