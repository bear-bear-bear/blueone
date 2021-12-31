import { List } from 'antd';
import useSWRImmutable from 'swr/immutable';
import { axiosFetcher } from '@utils/swr';
import LogoutButton from '@components/LogoutButton';
import type { EndPoint } from '@typings';
import { SettingsFooter, SettingsHeader, SettingsSkeleton } from './parts';
import PasswordChangeButton from './PasswordChangeButton';
import * as S from './styles';

export type UserWithInfo = EndPoint['GET /user']['responses']['200'];

const items = [
  <PasswordChangeButton key="passwordChangeButton" />,
  <LogoutButton key="logoutButton" kind="text" style={{ color: 'white', padding: 0, textAlign: 'left' }} block />,
];

const Settings = () => {
  const { data: user } = useSWRImmutable<UserWithInfo>('/user', axiosFetcher);

  if (!user) {
    return <SettingsSkeleton />;
  }
  return (
    <S.StyleCustomWrapper>
      <List
        header={<SettingsHeader user={user} />}
        footer={<SettingsFooter />}
        dataSource={items}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{
          color: '#fff',
        }}
      />
    </S.StyleCustomWrapper>
  );
};

export default Settings;
