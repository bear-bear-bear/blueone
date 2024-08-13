import { List } from 'antd';
import useSWRImmutable from 'swr/immutable';
import LogoutButton from '@/components/LogoutButton';
import type { EndPoint } from '@/typings';
import { axiosFetcher } from '@/utils/swr';
import { css, Global } from '@emotion/react';
import PasswordChangeButton from './PasswordChangeButton';
import { SettingsFooter, SettingsHeader, SettingsSkeleton } from './parts';

type User = EndPoint['GET /user']['responses']['200'];

export default function Settings() {
  const { data: user } = useSWRImmutable<User>('/user', axiosFetcher);

  if (!user) {
    return <SettingsSkeleton />;
  }
  return (
    <>
      <Global styles={globalCSS} />

      <List
        header={<SettingsHeader user={user} />}
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

const items = [<PasswordChangeButton key="change-password" />, <LogoutButton key="sign-out" kind="text" block />];

const globalCSS = css`
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
