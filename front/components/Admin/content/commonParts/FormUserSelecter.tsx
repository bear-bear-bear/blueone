import { useCallback, useMemo, memo } from 'react';

import { Divider, FormInstance, Select, SelectProps, Skeleton } from 'antd';

import useSWR from 'swr';

import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import type { EndPoint } from '@typings';
import processPhoneNumber from '@utils/processPhoneNumber';
import { axiosFetcher } from '@utils/swr';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  form: FormInstance<WorkAddFormFields>;
  defaultUserId?: WorkAddFormFields['UserId'];
  disabled?: boolean;
  immutable?: boolean;
};

const { Option } = Select;

const FormUserSelecter = ({ form, defaultUserId, disabled = false, immutable = false }: Props) => {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: !immutable,
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

  const selectSearchFilter: SelectProps<WorkAddFormFields['UserId']>['filterOption'] = useCallback(
    (inputValue, option) =>
      option?.children
        .filter((v: unknown) => typeof v === 'string')
        .join('')
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0,
    [],
  );

  const onSelect: SelectProps<WorkAddFormFields['UserId']>['onSelect'] = (v) => {
    form.setFieldsValue({ UserId: Number(v) });
  };

  const onClear: SelectProps<WorkAddFormFields['UserId']>['onClear'] = () => {
    form.setFieldsValue({ UserId: undefined });
  };

  return (
    <Select
      placeholder={isDeletedUser ? '(삭제된 기사가 배정되어 있습니다)' : '업무를 배정받을 기사 선택'}
      showSearch
      filterOption={selectSearchFilter}
      onSelect={onSelect}
      onClear={onClear}
      allowClear
      defaultValue={isDeletedUser ? undefined : defaultUserId ?? undefined}
      disabled={disabled}
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

export default memo(FormUserSelecter);
