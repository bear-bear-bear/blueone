'use client';
import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { SWRConfig } from 'swr';
import { Global } from '@emotion/react';
import globalCSS from '@globalStyles/global';
import theme from '@globalStyles/theme';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: 2000,
        errorRetryInterval: 5000,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.primaryColor,
          },
        }}
      >
        {children}

        <Global styles={globalCSS} />
      </ConfigProvider>
    </SWRConfig>
  );
}
