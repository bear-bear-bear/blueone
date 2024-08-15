import { Dispatch, SetStateAction } from 'react';
import { Divider, Select, Tooltip } from 'antd';
import useSWR from 'swr';
import { Me } from '@/entities/me';
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
      className="w-56" // Tailwind class for width
      loading={!users}
    >
      {users?.map((user) => {
        const {
          id,
          phoneNumber,
          UserInfo: { realname },
        } = user;
        const insuranceInfo = Me.insuranceInfo(user);

        return (
          <Select.Option key={id} value={id} className="text-center">
            {insuranceInfo.state === 'nearExpiration' && (
              <>
                <Tooltip title={`보험 일자 만료 ${insuranceInfo.from}`}>
                  <WarningOutlined className="text-yellow-500" />
                </Tooltip>
                <Divider type="vertical" className="mx-2" />
              </>
            )}
            {insuranceInfo.state === 'expired' && (
              <>
                <Tooltip title={`보험 일자 만료됨`}>
                  <WarningOutlined className="text-red-500" />
                </Tooltip>
                <Divider type="vertical" className="mx-2" />
              </>
            )}
            <span>{realname}</span>
            <Divider type="vertical" className="mx-2" />
            <span>{processPhoneNumber(phoneNumber)}</span>
          </Select.Option>
        );
      })}
    </Select>
  );
}
