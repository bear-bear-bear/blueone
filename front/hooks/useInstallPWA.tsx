import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { BeforeInstallPromptEvent } from '@typings/promptEvent';

const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default function useInstallPWA() {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const deferredInstallPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  const prepareInstall = useCallback((e: BeforeInstallPromptEvent) => {
    deferredInstallPrompt.current = e;
    setButtonVisible(true);
  }, []);

  const installPWA = useCallback(async () => {
    if (!deferredInstallPrompt.current) return;
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
  }, []);

  useEffect(() => {
    if (MOBILE_REGEX.test(navigator.userAgent)) {
      setButtonVisible(true);
    }

    window.addEventListener('beforeinstallprompt', prepareInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', prepareInstall);
    };
  }, []);

  return (props: HTMLAttributes<HTMLButtonElement>) => (
    <Button
      icon={<DownloadOutlined />}
      onClick={installPWA}
      style={{
        position: 'absolute',
        bottom: '1.33rem',
        right: '1.33rem',
        display: buttonVisible ? 'block' : 'none',
      }}
      shape="circle"
      size="large"
      {...props}
    />
  );
}
