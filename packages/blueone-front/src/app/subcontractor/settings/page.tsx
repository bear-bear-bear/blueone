'use client';
import { List } from 'antd';
import { SettingsFooter, SettingsHeader } from '@/app/subcontractor/settings/parts';
import PasswordChangeButton from '@/app/subcontractor/settings/password-change-button.component';
import SignOutButton from '@/components/sign-out-button.component';
import { useSuspenseFetchMe } from '@/entities/me';
import { css, Global } from '@emotion/react';

export default function SettingPage() {
  const { data: me } = useSuspenseFetchMe();

  return (
    <>
      <Global styles={globalStyles} />

      <List
        header={<SettingsHeader me={me} />}
        footer={<SettingsFooter />}
        dataSource={items}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{
          padding: 'unset',
        }}
      />
    </>
  );
}

const items = [<PasswordChangeButton key="change-password" />, <SignOutButton key="sign-out" kind="text" block />];

const globalStyles = css`
  .ant-list-header {
    border-bottom: none !important;
    margin-bottom: 0.33rem;
  }

  .ant-list-items {
    background: #1c1c1c;
    border-top: 1px solid #303030;
    border-bottom: 1px solid #303030;
  }

  .ant-list-item {
    padding: unset !important;
    border-bottom: none !important;

    :not(:first-of-type) {
      border-top: 1px solid #303030;
    }

    button {
      font-size: 16px;
      padding: 24px 0 !important;
      color: #888;
    }
  }
`;
