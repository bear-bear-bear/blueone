'use client';
import { ReactNode } from 'react';
import { App, ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/lib';
import { SWRConfig } from 'swr';
import globalCSS from '@/global-styles/global';
import theme from '@/global-styles/theme';
import { Global } from '@emotion/react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: 2000,
        errorRetryInterval: 5000,
      }}
    >
      <ConfigProvider theme={antdTheme}>
        <App message={{ maxCount: 2 }}>{children}</App>

        <Global styles={globalCSS} />
      </ConfigProvider>
    </SWRConfig>
  );
}

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: theme.primaryColor,
    borderRadius: theme.borderRadius,
  },
  components: {
    Alert: {
      /**
       * `banner: true`일 때의 스타일 또한 덮어씌우기 위해 important 사용
       */
      colorInfoBorder: `${theme.primaryColor} !important`,
      colorInfoBg: 'none !important',
      colorInfoText: '#fff !important',
    },
    Tabs: {
      itemColor: '#fff',
      itemSelectedColor: theme.primaryColor,
      itemHoverColor: theme.primaryColor,
      inkBarColor: theme.primaryColor,
    },
  },
};
