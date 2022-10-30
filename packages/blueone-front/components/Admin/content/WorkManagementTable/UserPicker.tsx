import type { FC } from 'react';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Divider, Select, SelectProps, Skeleton } from 'antd';
import useSWR from 'swr';
import type { EndPoint, User } from '@typings';
import processPhoneNumber from '@utils/processPhoneNumber';
import { axiosFetcher } from '@utils/swr';

type Props = {
  pickedUserId: User['id'] | null;
  setPickedUserId: Dispatch<SetStateAction<User['id'] | null>>;
};
type Users = EndPoint['GET /users']['responses']['200'];

const { Option } = Select;

const UserPicker: FC<Props> = ({ pickedUserId, setPickedUserId }) => {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  });

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

  const selectSearchFilter: SelectProps<User['id']>['filterOption'] = useCallback(
    (inputValue, option) =>
      option?.children
        .filter((v: unknown) => typeof v === 'string')
        .join('')
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0,
    [],
  );

  const onSelect: SelectProps<User['id']>['onSelect'] = (v) => {
    setPickedUserId(Number(v));
  };

  const onClear: SelectProps<User['id']>['onClear'] = () => {
    setPickedUserId(null);
  };

  return (
    <Select
      placeholder="모든 기사의 업무 표시"
      showSearch
      filterOption={selectSearchFilter}
      onSelect={onSelect}
      onClear={onClear}
      allowClear
      value={pickedUserId}
      style={{ width: '13rem' }}
    >
      {!userOptions ? (
        <Option value="" disabled>
          <Skeleton title={false} paragraph={{ width: '100%', rows: 3 }} active />
        </Option>
      ) : (
        userOptions
      )}
    </Select>
  );
};

export default UserPicker;
