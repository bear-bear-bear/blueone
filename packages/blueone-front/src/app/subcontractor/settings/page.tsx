'use client';
import { Avatar, Card, List } from 'antd';
import SignOutButton from '@/components/sign-out-button.component';
import { Me, useSuspenseFetchMe } from '@/entities/me';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import PasswordChangeButton from './password-change-button.component';
import './page.css';

export default function SettingPage() {
  const { data: me } = useSuspenseFetchMe();

  return (
    <List
      header={<SettingsHeader me={me} />}
      footer={<SettingsFooter />}
      dataSource={[<PasswordChangeButton key="change-password" />, <SignOutButton key="sign-out" kind="text" block />]}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      className="p-[unset]"
    />
  );
}

function SettingsHeader({ me }: { me: Me.Model }) {
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
