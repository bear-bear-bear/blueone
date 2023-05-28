import { useCallback, useMemo, memo } from 'react';
import { Divider, FormInstance, Select, SelectProps, Skeleton, Tooltip } from 'antd';
import useSWR from 'swr';
import type { EndPoint } from '@typings';
import { WarningOutlined } from '@ant-design/icons';
import type { WorkAddFormFields } from '@components/Admin/content/WorkManagementTable/AddForm';
import getInsuranceExpirationInfo from '@utils/getInsuranceExpirationInfo';
import processPhoneNumber from '@utils/processPhoneNumber';
import { axiosFetcher } from '@utils/swr';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  form: FormInstance<WorkAddFormFields>;
  defaultUserId?: WorkAddFormFields['userId'];
  disabled?: boolean;
  immutable?: boolean;
};

const { Option } = Select;

const FormUserSelector = ({ form, defaultUserId, disabled = false, immutable = false }: Props) => {
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

  const selectSearchFilter: SelectProps<WorkAddFormFields['userId']>['filterOption'] = useCallback(
    (inputValue, option) =>
      option?.children
        .filter((v: unknown) => typeof v === 'string')
        .join('')
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0,
    [],
  );

  const onSelect: SelectProps<WorkAddFormFields['userId']>['onSelect'] = useCallback(
    (v) => {
      form.setFieldsValue({ userId: Number(v) });
    },
    [form],
  );

  const onClear: SelectProps<WorkAddFormFields['userId']>['onClear'] = useCallback(() => {
    form.setFieldsValue({ userId: undefined });
  }, [form]);

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

export default memo(FormUserSelector);
