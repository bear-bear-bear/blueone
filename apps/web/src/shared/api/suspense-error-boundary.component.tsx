'use client';
import { ReactNode, Suspense, useEffect } from 'react';
import { Spin, Typography, message as AntdMessage, Button } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { getErrorMessage } from '@/shared/api/get-error-message';
import { LoadingPanel } from '@/shared/ui/components/loading-panel';

type Props = {
  fallback?: NonNullable<ReactNode>;
  enableReload?: boolean;
  enableErrorDialog?: boolean;
  children: ReactNode;
};
export default function SuspenseErrorBoundary({
  fallback = <LoadingPanel />,
  enableReload,
  enableErrorDialog = true,
  children,
}: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorFallback error={error} enableReload={enableReload} enableErrorDialog={enableErrorDialog} />
      )}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

type ErrorFallbackProps = {
  error: unknown;
  enableReload?: boolean;
  enableErrorDialog?: boolean;
};
function ErrorFallback({ error, enableReload, enableErrorDialog }: ErrorFallbackProps) {
  const message = enableReload
    ? 'Something went wrong. Please click "Reload" button.'
    : 'Something went wrong. Please try again after sometime.';

  useEffect(() => {
    if (enableErrorDialog && error) {
      AntdMessage.error(getErrorMessage(error));
    }
  }, [enableErrorDialog, error, message]);

  return (
    <div className="flexColCenter w-full h-full">
      <Spin />

      <Typography.Paragraph style={{ marginTop: 24, marginBottom: 'unset' }}>{message}</Typography.Paragraph>

      {enableReload && typeof window !== 'undefined' && (
        <Button style={{ marginTop: 12 }} onClick={() => location.reload()}>
          Reload
        </Button>
      )}
    </div>
  );
}
