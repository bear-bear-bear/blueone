'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import AntdConfigProvider from '@/app/_providers/antd-config.provider';
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
      </AntdConfigProvider>
    </SWRConfig>
  );
}
