import { ReactNode } from 'react';
import { Avatar, List, Tooltip } from 'antd';
import type { FullUser } from '@/app/admin/users/page';
import { Subcontractor } from '@/core/subcontractor';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import DeleteButton from './delete-button.component';
import EditButton from './edit-button.component';

const { Item } = List;

export default function UserItem(user: FullUser) {
  const {
    id,
    phoneNumber,
    UserInfo: { realname, insuranceExpirationDate },
  } = user;
  const insuranceInfo = Subcontractor.insuranceInfo(user.UserInfo.insuranceExpirationDate);

  return (
    <StyledItem
      actions={[
        <EditButton user={user} key={`editButton_${id}`} />,
        <DeleteButton user={user} key={`deleteButton_${id}`} />,
      ]}
    >
      <Item.Meta
        avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: mainColor[insuranceInfo.state] }} />}
        title={getTitle(insuranceInfo.state, realname)}
        description={
          <div style={{ textDecoration: `${insuranceInfo.state === 'expired' ? 'line-through' : 'initial'}` }}>
            <p>{processPhoneNumber(phoneNumber)}</p>
            <p>
              {insuranceInfo.state === 'expired'
                ? '보험이 만료되었습니다'
                : `보험 만료일: ${insuranceExpirationDate} (${insuranceInfo.to})`}
            </p>
          </div>
        }
      />
    </StyledItem>
  );
}

const mainColor: { [key in Subcontractor.InsuranceState]: string } = {
  normal: '#ccc',
  nearExpiration: '#eed202',
  expired: '#ff4d4f',
};
function getTitle(state: Subcontractor.InsuranceState, realname: string): ReactNode {
  switch (state) {
    case 'normal':
      return <span>{realname}</span>;
    case 'nearExpiration':
      return (
        <>
          <span>{realname}</span>
          &nbsp;
          <Tooltip title="보험 만료가 얼마 남지 않았습니다.">
            <WarningOutlined style={{ color: mainColor['nearExpiration'], verticalAlign: 'text-top' }} />
          </Tooltip>
        </>
      );
    case 'expired':
      return (
        <>
          <span style={{ textDecoration: 'line-through' }}>{realname}</span>
          &nbsp;
          <Tooltip title="보험이 만료되었습니다.">
            <WarningOutlined style={{ color: mainColor.expired, verticalAlign: 'text-top' }} />
          </Tooltip>
        </>
      );
    default:
      return <span>{realname}</span>;
  }
}

const StyledItem = styled(List.Item)`
  :hover,
  :focus {
    background: #fafafa;
  }
`;
