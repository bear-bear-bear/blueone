import { useMemo } from 'react';
import { Divider, FormInstance, Select, Tooltip } from 'antd';
import useSWR from 'swr';
import type { WorkAddFormValues } from '@/app/admin/works/add-form.component';
import { Subcontractor } from '@/core/subcontractor';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import type { EndPoint, User } from '@/typings';
import { WarningOutlined } from '@ant-design/icons';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  form: FormInstance<WorkAddFormValues>;
  defaultValue?: WorkAddFormValues['userId'];
  disabled?: boolean;
  immutable?: boolean;
};

export default function UserSelector({ form, defaultValue, disabled = false, immutable = false }: Props) {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: !immutable,
  });

  const isDeletedUser = useMemo(() => {
    if (!users) return false;

    return typeof defaultValue === 'number' && users.findIndex((user) => user.id === defaultValue) < 0;
  }, [users, defaultValue]);

  const handleSelect = (v: number) => {
    form.setFieldsValue({ userId: v });
  };

  const handleClear = () => {
    form.setFieldsValue({ userId: undefined });
  };

  return (
    <Select<User['id']>
      placeholder={isDeletedUser ? '(삭제된 기사가 배정되어 있습니다)' : '업무를 배정받을 기사 선택'}
      showSearch
      optionFilterProp="children"
      onSelect={handleSelect}
      onClear={handleClear}
      allowClear
      defaultValue={isDeletedUser ? undefined : defaultValue ?? undefined}
      disabled={disabled}
      loading={!users}
    >
      {users?.map((user) => {
        const {
          id,
          phoneNumber,
          UserInfo: { realname },
        } = user;
        const insuranceInfo = Subcontractor.insuranceInfo(user.UserInfo.insuranceExpirationDate);

        return (
          <Select.Option key={id} value={id} style={{ textAlign: 'center' }}>
            {insuranceInfo.state === 'nearExpiration' && (
              <>
                <Tooltip title={`보험 일자 만료 ${insuranceInfo.from}`}>
                  <WarningOutlined style={{ color: '#D89614', fontSize: 'inherit' }} />
                </Tooltip>
                <Divider type="vertical" />
              </>
            )}
            {insuranceInfo.state === 'expired' && (
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
          </Select.Option>
        );
      })}
    </Select>
  );
}
