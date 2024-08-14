import { Avatar, Card, Skeleton, Space } from 'antd';
import type { EndPoint } from '@/shared/api/types';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import theme from '@/shared/ui/theme';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

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
  <StyledCard>
    <Card.Meta
      avatar={<Avatar icon={<UserOutlined />} size={54} style={{ backgroundColor: theme.primaryColor }} />}
      title={<p style={{ fontSize: '18px', marginTop: '2px' }}>{user.UserInfo?.realname || 'Contractor'}</p>}
      description={
        <>
          <PhoneOutlined style={{ transform: 'rotateY(180deg)', marginRight: '0.3rem', fontSize: '18px' }} />
          <span>{processPhoneNumber(user.phoneNumber)}</span>
        </>
      }
    />
  </StyledCard>
);
const StyledCard = styled(Card)`
  background: #1c1c1c !important;
  border: none;
  border-top: 1px solid #303030;
  border-bottom: 1px solid #303030;

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title {
    color: #fafafa;
    font-size: 16px;
    margin-bottom: 0.2rem !important;
  }

  .ant-card-meta-description {
    font-weight: 300;
    color: #ccc;
  }
`;

export const SettingsFooter = () => {
  return <Footer>Copyright ©2014 BLUEONE, Inc. All rights reserved.</Footer>;
};
const Footer = styled.footer`
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
  font-weight: 300;
  color: #888;
`;
