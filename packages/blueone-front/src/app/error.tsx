'use client';
import { useEffect } from 'react';
import { Button, message, Typography } from 'antd';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/api/get-error-message';
import isAuthError from '@/shared/api/is-auth-error';
import { errorLog } from '@/shared/lib/utils/log/logger';
import withDebugger from '@/shared/lib/utils/log/with-debugger';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    if (isAuthError(error) && location.pathname !== '/') {
      location.href = '/';
    } else {
      errorLogger(error);

      const MESSAGE_DURATION = 4;
      const SUFFIX = '사무실에 문의해주세요.';

      if (!isAxiosError(error)) {
        message.error(`작업 수행 중 에러 발생, ${SUFFIX}`, MESSAGE_DURATION);
        return;
      }
      if (!error.response) {
        message.error(`요청이 수행되었으나 서버가 응답하지 않습니다. ${SUFFIX}`, MESSAGE_DURATION);
        return;
      }
      if (error.response.status >= 500) {
        message.error(`작업 수행 중 서버 측 에러 발생, ${SUFFIX}`, MESSAGE_DURATION);
        return;
      }
      if (!error.response.data.message) {
        message.error(`작업 수행 중 정의되지 않은 에러 발생, ${SUFFIX}`, MESSAGE_DURATION);
        return;
      }
      message.error(error.response.data.message, MESSAGE_DURATION);
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
