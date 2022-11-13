import type { FC } from 'react';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Divider, Select, SelectProps, Skeleton, Tooltip } from 'antd';
import useSWR from 'swr';
import type { EndPoint, User } from '@typings';
import { WarningOutlined } from '@ant-design/icons';
import getInsuranceExpirationInfo from '@utils/getInsuranceExpirationInfo';
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

    return users.map((user) => {
      const {
        id,
        phoneNumber,
        UserInfo: { realname },
      } = user;
      const insuranceDate = getInsuranceExpirationInfo(user);

      return (
        <Option key={id} value={id} style={{ textAlign: 'center' }}>
          {insuranceDate.state === 'warn' && (
            <>
              <Tooltip title={`보험 일자 만료 ${insuranceDate.from}`}>
                <WarningOutlined style={{ color: '#D89614', fontSize: 'inherit' }} />
              </Tooltip>
              <Divider type="vertical" />
            </>
          )}
          {insuranceDate.state === 'danger' && (
            <>
              <Tooltip title={`보험 일자 만료됨`}>
                <WarningOutlined style={{ color: '#A61D24', fontSize: 'inherit' }} />
              </Tooltip>
              <Divider type="vertical" />
            </>
          )}
          {realname}
          <Divider type="vertical" />
          {processPhoneNumber(phoneNumber)}
        </Option>
      );
    });
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

  const onSelect: SelectProps<User['id']>['onSelect'] = useCallback(
    (v) => {
      setPickedUserId(Number(v));
    },
    [setPickedUserId],
  );

  const onClear: SelectProps<User['id']>['onClear'] = useCallback(() => {
    setPickedUserId(null);
  }, [setPickedUserId]);

  return (
    <Select
      placeholder="모든 기사의 업무 표시"
      showSearch
      filterOption={selectSearchFilter}
      onSelect={onSelect}
      onClear={onClear}
      allowClear
      value={pickedUserId}
      style={{ width: '14rem' }}
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
