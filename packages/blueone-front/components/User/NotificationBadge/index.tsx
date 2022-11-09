import { useEffect, FC, ReactNode, useCallback } from 'react';
import { Button, message, notification, Tooltip } from 'antd';
import { CloseOutlined, InfoOutlined, WarningOutlined } from '@ant-design/icons';
import * as S from './styles';

export type Props = {
  type: 'info' | 'warn' | 'error';
  content: string;
};

const dict: Record<
  Props['type'],
  {
    title: ReactNode;
    icon: ReactNode;
  }
> = {
  info: {
    title: <S.BoldTitle>정보 알림</S.BoldTitle>,
    icon: <InfoOutlined style={{ color: '#177DDC', fontSize: 'inherit' }} />,
  },
  warn: {
    title: <S.BoldTitle>경고 알림</S.BoldTitle>,
    icon: <WarningOutlined style={{ color: '#D89614', fontSize: 'inherit' }} />,
  },
  error: {
    title: <S.BoldTitle>경고 알림</S.BoldTitle>,
    icon: <WarningOutlined style={{ color: '#A61D24', fontSize: 'inherit' }} />,
  },
};

const NotificationBadge: FC<Props> = ({ type, content }) => {
  const { title, icon } = dict[type];

  const handleClick = useCallback(() => {
    message[type](content);
  }, [content, type]);

  useEffect(() => {
    if (document.cookie.includes(`notified_${content}`)) return;

    notification.open({
      message: title,
      description: content,
      icon,
      duration: 0, // Do not auto close
      onClose: () => {
        // 24시간마다 자동 알림
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const cookieExpires = new Date(ONE_DAY + Date.now()).toUTCString();
        document.cookie = `notified_${content}=true; expires=${cookieExpires};`;
      },
      closeIcon: <CloseOutlined style={{ fontSize: 20 }} />,
    });
  }, [content, icon, title, type]);

  return (
    <S.RightTopLayout>
      <Tooltip title={title} align={{ useCssBottom: true, useCssRight: false }}>
        <Button type="text" icon={icon} onClick={handleClick} size="large" style={{ fontSize: 30 }} />
      </Tooltip>
    </S.RightTopLayout>
  );
};

export default NotificationBadge;
