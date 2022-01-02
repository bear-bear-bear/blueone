import { ReactNode } from 'react';
import { Avatar, List, Tooltip } from 'antd';
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import useInsuranceExpiredInfo from '@hooks/useInsuranceExpiredInfo';
import processPhoneNumber from '@utils/processPhoneNumber';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import type { FullUser } from './index';
import * as S from './styles';

type NotUndefined<T> = T extends undefined ? never : T;
type InsuranceState = NotUndefined<ReturnType<typeof useInsuranceExpiredInfo>['state']>;

const { Item } = List;

const mainColor: { [key in InsuranceState]: string } = {
  safe: '#ccc',
  warn: '#eed202',
  danger: '#ff4d4f',
};

const getTitle: (state: InsuranceState, realname: string) => ReactNode = (state, realname) => {
  switch (state) {
    case 'safe':
      return <span>{realname}</span>;
    case 'warn':
      return (
        <>
          <span>{realname}</span>
          &nbsp;
          <Tooltip title="보험 만료가 얼마 남지 않았습니다.">
            <WarningOutlined style={{ color: mainColor.warn, verticalAlign: 'text-top' }} />
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
      return;
  }
};

const UserItem = (user: FullUser) => {
  const {
    id,
    phoneNumber,
    UserInfo: { realname, insuranceExpirationDate },
  } = user;
  const { state: insuranceState, to: insuranceTo } = useInsuranceExpiredInfo(user);

  if (!insuranceState) return null;
  return (
    <S.StyledItem
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
    </S.StyledItem>
  );
};

export default UserItem;
