import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, List, Tooltip } from 'antd';
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import processPhoneNumber from '@utils/processPhoneNumber';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import type { FullUser } from './index';
import * as S from './styles';

dayjs.locale('ko');
dayjs.extend(relativeTime);
const { Item } = List;

const UserItem = (user: FullUser) => {
  const {
    id,
    phoneNumber,
    UserInfo: { realname, insuranceExpirationDate },
  } = user;

  const now = dayjs();
  const DAY = 24 * 60 * 60 * 1000;
  const isValidInsurance = now.isBefore(insuranceExpirationDate, 'day');
  const isImminentExpiredAt = !isValidInsurance ? false : dayjs(insuranceExpirationDate).diff(now, 'ms') < 7 * DAY;
  const expiredAtFromNow = () => now.to(insuranceExpirationDate);

  return (
    <S.StyledItem
      actions={[
        <EditButton user={user} key={`editButton_${id}`} />,
        <DeleteButton user={user} key={`deleteButton_${id}`} />,
      ]}
    >
      <Item.Meta
        avatar={
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: `${isValidInsurance ? (!isImminentExpiredAt ? '#ccc' : '#eed202') : '#ff4d4f'}` }}
          />
        }
        title={
          isValidInsurance ? (
            !isImminentExpiredAt ? (
              <span>{realname}</span>
            ) : (
              <>
                <span>{realname}</span>
                &nbsp;
                <Tooltip title="보험 만료가 얼마 남지 않았습니다.">
                  <WarningOutlined style={{ color: '#eed202', verticalAlign: 'text-top' }} />
                </Tooltip>
              </>
            )
          ) : (
            <>
              <span style={{ textDecoration: 'line-through' }}>{realname}</span>
              &nbsp;
              <Tooltip title="보험이 만료되었습니다.">
                <WarningOutlined style={{ color: '#ff4d4f', verticalAlign: 'text-top' }} />
              </Tooltip>
            </>
          )
        }
        description={
          <div style={{ textDecoration: `${isValidInsurance ? 'initial' : 'line-through'}` }}>
            <p>{processPhoneNumber(phoneNumber)}</p>
            <p>
              {isValidInsurance
                ? `보험 만료일: ${insuranceExpirationDate} (${expiredAtFromNow()})`
                : '보험이 만료되었습니다'}
            </p>
          </div>
        }
      />
    </S.StyledItem>
  );
};

export default UserItem;
