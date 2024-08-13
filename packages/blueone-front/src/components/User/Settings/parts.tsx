import { Avatar, Card, Skeleton, Space } from 'antd';
import theme from '@/globalStyles/theme';
import type { EndPoint } from '@/typings';
import processPhoneNumber from '@/utils/processPhoneNumber';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
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

type User = EndPoint['GET /user']['responses']['200'];
export const SettingsHeader = ({ user }: { user: User }) => (
  <S.StyledCard>
    <Card.Meta
      avatar={<Avatar icon={<UserOutlined />} size={54} style={{ backgroundColor: theme.primaryColor }} />}
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
  return <S.Footer>Copyright ©2014 BLUEONE, Inc. All rights reserved.</S.Footer>;
};
