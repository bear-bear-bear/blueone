import React, { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { Divider, FormInstance, Select, SelectProps, Spin } from 'antd';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { Fields } from './index';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  form: FormInstance<Fields>;
};

const { Option } = Select;

const UserSelecter = ({ form }: Props) => {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  const userOptions = useMemo(() => {
    if (!users) return;
    return users.map(({ id, phoneNumber, UserInfo: { realname } }) => (
      <Option value={id} style={{ textAlign: 'center' }}>
        {realname}
        <Divider type="vertical" />
        {phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
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

  const onSelect: SelectProps<Fields['UserId'] & string>['onSelect'] = (v) => {
    form.setFieldsValue({ UserId: v });
  };

  return (
    <Select
      placeholder="작업을 배정받을 기사 선택"
      showSearch
      filterOption={selectSearchFilter}
      onSelect={onSelect}
      allowClear
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