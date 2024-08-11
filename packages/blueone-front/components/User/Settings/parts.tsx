import { Avatar, Card, Skeleton, Space } from 'antd';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import type { UserWithInfo } from '@components/User/Settings/index';
import processPhoneNumber from '@utils/processPhoneNumber';
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

export const SettingsHeader = ({ user }: { user: UserWithInfo }) => (
  <S.StyledCard>
    <Card.Meta
      avatar={<Avatar icon={<UserOutlined />} size={54} style={{ backgroundColor: '#00598d' }} />}
      title={<p style={{ fontSize: '18px', marginTop: '2px' }}>{user.UserInfo?.realname || 'Admin'}</p>}
      description={
        <>
          <PhoneOutlined style={{ transform: 'rotateY(180deg)', marginRight: '0.3rem', fontSize: '18px' }} />
          <span>{processPhoneNumber(user.phoneNumber)}</span>
        </>
      }
    />
  </S.StyledCard>
);

export const SettingsFooter = () => {
  return <S.Footer>Copyright ©2014-2022 BLUEONE, Inc. All rights reserved.</S.Footer>;
};
