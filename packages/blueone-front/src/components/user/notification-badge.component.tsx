import { useEffect, ReactNode } from 'react';
import { App, Button, Tooltip } from 'antd';
import { CloseOutlined, InfoOutlined, WarningOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

type Props = {
  type: 'info' | 'warning' | 'error';
  content: string;
};

export default function NotificationBadge({ type, content }: Props) {
  const { title, icon } = dict[type];
  const { message, notification } = App.useApp();

  const handleClick = () => {
    message[type](content);
  };

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
    <RightTopLayout>
      <Tooltip title={title} align={{ useCssBottom: true, useCssRight: false }}>
        <Button type="text" icon={icon} onClick={handleClick} size="large" style={{ fontSize: 30 }} />
      </Tooltip>
    </RightTopLayout>
  );
}

const RightTopLayout = styled.div`
  z-index: 500;
  position: absolute;
  top: -2.5rem;
  right: 1.66rem;
  transform: translate(50%, -50%);
`;

const BoldTitle = styled.span`
  font-weight: 500;
`;
const dict: Record<
  Props['type'],
  {
    title: ReactNode;
    icon: ReactNode;
  }
> = {
  info: {
    title: <BoldTitle>정보 알림</BoldTitle>,
    icon: <InfoOutlined style={{ color: '#177DDC', fontSize: 'inherit' }} />,
  },
  warning: {
    title: <BoldTitle>경고 알림</BoldTitle>,
    icon: <WarningOutlined style={{ color: '#D89614', fontSize: 'inherit' }} />,
  },
  error: {
    title: <BoldTitle>경고 알림</BoldTitle>,
    icon: <WarningOutlined style={{ color: '#A61D24', fontSize: 'inherit' }} />,
  },
};
