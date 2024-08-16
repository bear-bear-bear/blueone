'use client';
import { Avatar, Button, Card, List } from 'antd';
import { useFetchMe } from '@/entities/me';
import { useSignOut } from '@/features/sign-out';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import PasswordChangeButton from './password-change-button.component';
import './page.css';

export default function SettingPage() {
  const { mutate: signOut } = useSignOut();

  return (
    <List
      header={<SettingsHeader />}
      footer={<SettingsFooter />}
      dataSource={[
        <PasswordChangeButton key="change-password" />,
        <Button key="sign-out" type="text" onClick={() => signOut()} block>
          로그아웃
        </Button>,
      ]}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      className="p-[unset]"
    />
  );
}

function SettingsHeader() {
  const { data: me } = useFetchMe();

  if (!me) return null;
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar icon={<UserOutlined />} size={54} className="bg-primary" />}
        title={<p className="text-lg mt-0.5">{me.UserInfo?.realname || 'Contractor'}</p>}
        description={
          <>
            <PhoneOutlined className="transform rotate-90 mr-1 text-lg" />
            <span>{processPhoneNumber(me.phoneNumber)}</span>
          </>
        }
      />
    </Card>
  );
}

function SettingsFooter() {
  return (
    <footer className="text-center py-4 text-sm text-gray-500">
      Copyright ©2014 BLUEONE, Inc. All rights reserved.
    </footer>
  );
}
