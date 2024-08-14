import { Dispatch, SetStateAction } from 'react';
import { Divider, Select, Tooltip } from 'antd';
import useSWR from 'swr';
import { Subcontractor } from '@/entities/subcontractor';
import type { EndPoint, User } from '@/shared/api/types';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { WarningOutlined } from '@ant-design/icons';

type Users = EndPoint['GET /users']['responses']['200'];
type Props = {
  value: User['id'] | null;
  setValue: Dispatch<SetStateAction<User['id'] | null>>;
};

export default function SubcontractorPicker({ value, setValue }: Props) {
  const { data: users } = useSWR<Users>('/users', axiosFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  });

  const handleSelect = (v: User['id']) => {
    setValue(v);
  };

  const handleClear = () => {
    setValue(null);
  };

  return (
    <Select<User['id']>
      placeholder="모든 기사의 업무 표시"
      showSearch
      optionFilterProp="children"
      onSelect={handleSelect}
      onClear={handleClear}
      allowClear
      value={value}
      style={{ width: '14rem' }}
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
