'use client';
import { ReactNode } from 'react';
import AntdConfigProvider from './antd-config.provider';
import ReactQueryProvider from './react-query.provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdConfigProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AntdConfigProvider>
  );
}
