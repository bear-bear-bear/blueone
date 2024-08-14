'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import AntdConfigProvider from '@/app/_providers/antd-config.provider';
import globalStyles from '@/shared/ui/foundation/global-styles';
import { Global } from '@emotion/react';
import ReactQueryProvider from './react-query.provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: 2000,
        errorRetryInterval: 5000,
      }}
    >
      <AntdConfigProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Global styles={globalStyles} />
      </AntdConfigProvider>
    </SWRConfig>
  );
}
