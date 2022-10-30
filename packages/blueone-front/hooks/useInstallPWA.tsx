import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { DownloadOutlined } from '@ant-design/icons';

import type { BeforeInstallPromptEvent } from '@typings/window';
import { Button, message } from 'antd';

const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default function useInstallPWA() {
  const [buttonVisible, setButtonVisible] = useState<boolean>(true);
  const deferredInstallPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  const prepareInstall = (e: BeforeInstallPromptEvent) => {
    console.log('prepare');
    deferredInstallPrompt.current = e;
    if (typeof navigator !== 'undefined' && MOBILE_REGEX.test(navigator.userAgent)) {
      setButtonVisible(true); // 모바일에서만 버튼 visible
    }
    console.log('abc', typeof navigator !== 'undefined' && MOBILE_REGEX.test(navigator.userAgent));
  };

  const installPWA = async () => {
    console.log('installPWA ?');
    if (!deferredInstallPrompt.current) return;
    console.log('installPWA');
    const { prompt, userChoice } = deferredInstallPrompt.current;
    try {
      await prompt();
      setButtonVisible(false);
      await userChoice;
      deferredInstallPrompt.current = null;
    } catch (err) {
      console.error(err);
      message.error('저장 중 에러가 발생했어요.');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('Event: beforeinstallprompt');
      prepareInstall(e);
    });
    return () => {
      window.removeEventListener('beforeinstallprompt', prepareInstall);
    };
  }, []);

  // eslint-disable-next-line react/display-name
  return (props: HTMLAttributes<HTMLButtonElement>) => (
    <Button
      icon={<DownloadOutlined />}
      onClick={installPWA}
      style={{
        display: buttonVisible ? 'initial' : 'none',
        position: 'absolute',
        bottom: '1.33rem',
        right: '1.33rem',
      }}
      shape="circle"
      size="large"
      {...props}
    />
  );
}
