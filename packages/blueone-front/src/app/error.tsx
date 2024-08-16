'use client';
import { useEffect } from 'react';
import { App, Button, Typography } from 'antd';
import { getErrorMessage, getErrorMessageForUser } from '@/shared/api/get-error-message';
import isAuthError from '@/shared/api/is-auth-error';
import { errorLog } from '@/shared/lib/utils/log/logger';
import withDebugger from '@/shared/lib/utils/log/with-debugger';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const { message } = App.useApp();

  useEffect(() => {
    if (isAuthError(error) && location.pathname !== '/') {
      location.href = '/';
    } else {
      errorLogger(error);
      message.error(getErrorMessageForUser(error));
    }
  }, [error]);

  return (
    <div className="h-screen flexColCenter gap-6 p-5 bg-gray-950">
      <Typography.Title className="!text-white" level={2}>
        Something went wrong :(
      </Typography.Title>

      <Typography.Text className="text-white">다시 시도하거나, 개발자를 호출해주세요.</Typography.Text>

      <div className="flex gap-2">
        <Button type="primary" onClick={() => reset()}>
          다시 시도
        </Button>
        <Button
          type="default"
          onClick={() => {
            location.href = '/';
          }}
        >
          홈으로
        </Button>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="relative min-w-[400px] w-max max-w-full bg-gray-600 text-gray-100 p-5 rounded-b rounded-tr break-words mt-6">
          <div className="absolute -top-5 left-0 text-gray-100 bg-gray-600 px-2 rounded-t">Error Message</div>
          {getErrorMessage(error)}
        </div>
      )}
    </div>
  );
}

const logger = withDebugger(0);
const errorLogger = logger(errorLog);
