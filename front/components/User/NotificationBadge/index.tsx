import { useEffect, FC, ReactNode } from 'react';
import { InfoOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import * as S from './styles';

export type Props = {
  type: 'info' | 'warn' | 'danger';
  content: string;
  tooltip?: string;
};

const mainColor: { [key in Props['type']]: string } = {
  info: '#177DDC',
  warn: '#D89614',
  danger: '#A61D24',
};

const tooltipTitle: { [key in Props['type']]: string } = {
  info: '정보 알림',
  warn: '경고 알림',
  danger: '경고 알림',
};

const messageFunc: { [key in Props['type']]: Function } = {
  info: message.info,
  warn: message.warn,
  danger: message.error,
};

const icon: { [key in Props['type']]: ReactNode } = {
  info: <InfoOutlined style={{ color: mainColor.info, fontSize: 'inherit' }} />,
  warn: <WarningOutlined style={{ color: mainColor.warn, fontSize: 'inherit' }} />,
  danger: <WarningOutlined style={{ color: mainColor.danger, fontSize: 'inherit' }} />,
};

const NotificationBadge: FC<Props> = ({ type, content, tooltip }) => {
  const handleClick = () => {
    messageFunc[type](content);
  };

  useEffect(() => {
    // 24시간마다 자동 알림
    if (!document.cookie.includes(`notified_${content}`)) {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      document.cookie = `notified_${content}=true; expires=` + new Date(ONE_DAY + Date.now()).toUTCString() + ';';
      messageFunc[type](content);
    }
  }, [document.cookie]);

  return (
    <S.RightTopLayout>
      <Tooltip title={tooltip || tooltipTitle[type]} align={{ useCssBottom: true, useCssRight: false }}>
        <Button type="text" icon={icon[type]} onClick={handleClick} size="large" style={{ fontSize: 30 }} />
      </Tooltip>
    </S.RightTopLayout>
  );
};

export default NotificationBadge;
