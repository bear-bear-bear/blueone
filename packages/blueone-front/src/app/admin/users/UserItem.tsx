import { ReactNode } from 'react';
import { Avatar, List, Tooltip } from 'antd';
import type { FullUser } from '@/app/admin/users/page';
import getInsuranceExpirationInfo, { InsuranceExpirationInfo } from '@/utils/getInsuranceExpirationInfo';
import processPhoneNumber from '@/utils/processPhoneNumber';
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

type InsuranceState = NonNullable<InsuranceExpirationInfo['state']>;

const { Item } = List;

const mainColor: { [key in InsuranceState]: string } = {
  safe: '#ccc',
  warning: '#eed202',
  danger: '#ff4d4f',
};

const getTitle: (state: InsuranceState, realname: string) => ReactNode = (state, realname) => {
  switch (state) {
    case 'safe':
      return <span>{realname}</span>;
    case 'warning':
      return (
        <>
          <span>{realname}</span>
          &nbsp;
          <Tooltip title="보험 만료가 얼마 남지 않았습니다.">
            <WarningOutlined style={{ color: mainColor.warning, verticalAlign: 'text-top' }} />
          </Tooltip>
        </>
      );
    case 'danger':
      return (
        <>
          <span style={{ textDecoration: 'line-through' }}>{realname}</span>
          &nbsp;
          <Tooltip title="보험이 만료되었습니다.">
            <WarningOutlined style={{ color: mainColor.danger, verticalAlign: 'text-top' }} />
          </Tooltip>
        </>
      );
    default:
      return <span>{realname}</span>;
  }
};

export default function UserItem(user: FullUser) {
  const {
    id,
    phoneNumber,
    UserInfo: { realname, insuranceExpirationDate },
  } = user;
  const { state: insuranceState, to: insuranceTo } = getInsuranceExpirationInfo(user);

  if (!insuranceState) return null;
  return (
    <StyledItem
      actions={[
        <EditButton user={user} key={`editButton_${id}`} />,
        <DeleteButton user={user} key={`deleteButton_${id}`} />,
      ]}
    >
      <Item.Meta
        avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: mainColor[insuranceState] }} />}
        title={getTitle(insuranceState, realname)}
        description={
          <div style={{ textDecoration: `${insuranceState === 'danger' ? 'line-through' : 'initial'}` }}>
            <p>{processPhoneNumber(phoneNumber)}</p>
            <p>
              {insuranceState === 'danger'
                ? '보험이 만료되었습니다'
                : `보험 만료일: ${insuranceExpirationDate} (${insuranceTo})`}
            </p>
          </div>
        }
      />
    </StyledItem>
  );
}

const StyledItem = styled(List.Item)`
  :hover,
  :focus {
    background: #fafafa;
  }
`;
