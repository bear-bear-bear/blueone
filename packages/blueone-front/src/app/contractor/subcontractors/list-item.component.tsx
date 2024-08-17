import { ReactNode } from 'react';
import { Avatar, Button, List, Tooltip } from 'antd';
import type { FullUser } from '@/app/contractor/subcontractors/page';
import { Me } from '@/entities/me';
import { EditSubcontractor } from '@/features/contractor/subcontractor/edit';
import cn from '@/shared/lib/utils/cn';
import processPhoneNumber from '@/shared/lib/utils/process-phone-number';
import { EditOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';
import DeleteButton from './delete-button.component';

const { Item } = List;

export default function ListItem(user: FullUser) {
  const {
    id,
    phoneNumber,
    UserInfo: { realname, insuranceExpirationDate },
  } = user;
  const insuranceInfo = Me.insuranceInfo(user);

  return (
    <Item
      className="hover:bg-gray-50 focus:bg-gray-50"
      actions={[
        <EditSubcontractor
          key={`editButton_${id}`}
          id={id}
          initialValues={{
            phoneNumber: user.phoneNumber,
            realname: user.UserInfo.realname,
            dateOfBirth: user.UserInfo.dateOfBirth,
            licenseNumber: user.UserInfo.licenseNumber,
            licenseType: user.UserInfo.licenseType,
            insuranceNumber: user.UserInfo.insuranceNumber,
            insuranceExpirationDate: user.UserInfo.insuranceExpirationDate,
          }}
          trigger={({ openModal, isPending }) => (
            <Tooltip title="수정">
              <Button type="text" size="small" icon={<EditOutlined />} onClick={openModal} loading={isPending} />
            </Tooltip>
          )}
        />,
        <DeleteButton user={user} key={`deleteButton_${id}`} />,
      ]}
    >
      <Item.Meta
        avatar={
          <Avatar
            icon={<UserOutlined />}
            className={cn({
              'bg-gray-300': insuranceInfo.state === 'normal',
              'bg-yellow-500': insuranceInfo.state === 'nearExpiration',
              'bg-red-500': insuranceInfo.state === 'expired',
            })}
          />
        }
        title={getTitle(insuranceInfo.state, realname)}
        description={
          <div className={cn({ 'line-through': insuranceInfo.state === 'expired' })}>
            <p>{processPhoneNumber(phoneNumber)}</p>
            <p>
              {insuranceInfo.state === 'expired'
                ? '보험이 만료되었습니다'
                : `보험 만료일: ${insuranceExpirationDate} (${insuranceInfo.to})`}
            </p>
          </div>
        }
      />
    </Item>
  );
}

function getTitle(state: Me.InsuranceState, realname: string): ReactNode {
  switch (state) {
    case 'normal':
      return <span>{realname}</span>;
    case 'nearExpiration':
      return (
        <>
          <span>{realname}</span>&nbsp;
          <Tooltip title="보험 만료가 얼마 남지 않았습니다.">
            <WarningOutlined className="align-text-top text-yellow-500" />
          </Tooltip>
        </>
      );
    case 'expired':
      return (
        <>
          <span className="line-through">{realname}</span>&nbsp;
          <Tooltip title="보험이 만료되었습니다.">
            <WarningOutlined className="align-text-top text-red-500" />
          </Tooltip>
        </>
      );
    default:
      return <span>{realname}</span>;
  }
}
