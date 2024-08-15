import { useEffect, ReactNode } from 'react';
import { App } from 'antd';
import { CloseOutlined, InfoOutlined, WarningOutlined } from '@ant-design/icons';

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
      closeIcon: <CloseOutlined className="text-2xl" />,
    });
  }, [content, title, type]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className="w-10 h-10 z-50 absolute bottom-6 left-6 [&_.anticon]:block [&_.anticon]:w-full [&_.anticon]:h-full [&_svg]:w-full [&_svg]:h-full"
    >
      {icon}
    </div>
  );
}

const dict: Record<
  Props['type'],
  {
    title: ReactNode;
    icon: ReactNode;
  }
> = {
  info: {
    title: <b>정보 알림</b>,
    icon: <InfoOutlined className="text-blue-600" />,
  },
  warning: {
    title: <b>경고 알림</b>,
    icon: <WarningOutlined className="text-yellow-700" />,
  },
  error: {
    title: <b>경고 알림</b>,
    icon: <WarningOutlined className="text-red-700" />,
  },
};
