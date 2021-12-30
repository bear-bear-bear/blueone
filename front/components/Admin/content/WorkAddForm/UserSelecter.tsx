import React, { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { Divider, FormInstance, Select, SelectProps, Spin } from 'antd';
import { axiosFetcher } from '@utils/swr';
import processPhoneNumber from '@utils/processPhoneNumber';
import type { EndPoint } from '@typings';
import type { Fields } from './index';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  form: FormInstance<Fields>;
  defaultUserId?: Fields['UserId'];
};

const { Option } = Select;

const UserSelecter = ({ form, defaultUserId }: Props) => {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const isDeletedUser = useMemo(() => {
    if (!users) return false;
    return typeof defaultUserId === 'number' && users.findIndex((user) => user.id === defaultUserId) < 0;
  }, [users, defaultUserId]);

  const userOptions = useMemo(() => {
    if (!users) return undefined;
    return users.map(({ id, phoneNumber, UserInfo: { realname } }) => (
      <Option key={id} value={id} style={{ textAlign: 'center' }}>
        {realname}
        <Divider type="vertical" />
        {processPhoneNumber(phoneNumber)}
      </Option>
    ));
  }, [users]);

  const selectSearchFilter: SelectProps<Fields['UserId']>['filterOption'] = useCallback(
    (inputValue, option) =>
      option?.children
        .filter((v: unknown) => typeof v === 'string')
        .join('')
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0,
    [],
  );

  const onSelect: SelectProps<Fields['UserId']>['onSelect'] = (v) => {
    form.setFieldsValue({ UserId: v });
  };

  const onClear: SelectProps<Fields['UserId']>['onClear'] = () => {
    form.setFieldsValue({ UserId: undefined });
  };

  return (
    <Select
      placeholder={isDeletedUser ? '(삭제된 기사가 배정되어 있습니다)' : '작업을 배정받을 기사 선택'}
      showSearch
      filterOption={selectSearchFilter}
      onSelect={onSelect}
      onClear={onClear}
      allowClear
      defaultValue={isDeletedUser ? undefined : defaultUserId ?? undefined}
    >
      {!userOptions ? (
        <Option value="" disabled>
          <Spin size="small" />
        </Option>
      ) : (
        userOptions
      )}
    </Select>
  );
};

export default React.memo(UserSelecter);
