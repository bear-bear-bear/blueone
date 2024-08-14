'use client';
import { useEffect } from 'react';
import { Button, message, Typography } from 'antd';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/api/get-error-message';
import isAuthError from '@/shared/api/is-auth-error';
import { errorLog } from '@/shared/lib/utils/log/logger';
import withDebugger from '@/shared/lib/utils/log/with-debugger';
import styled from '@emotion/styled';

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
    <Container>
      <Typography.Title level={2}>Something went wrong!</Typography.Title>

      <Button type="primary" onClick={() => reset()}>
        Try again
      </Button>

      {process.env.NODE_ENV === 'development' && <ErrorMessagePanel>{getErrorMessage(error)}</ErrorMessagePanel>}
    </Container>
  );
}

const logger = withDebugger(0);
const errorLogger = logger(errorLog);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

const ErrorMessagePanel = styled(Typography.Paragraph)`
  position: relative;
  min-width: 400px;
  width: max-content;
  max-width: 100%;
  background-color: #4a5568;
  color: #edf2f7;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  word-break: break-word;

  &::before {
    content: 'Error Message';
    position: absolute;
    z-index: 1;
    top: -20px;
    left: 0;
  }
`;
