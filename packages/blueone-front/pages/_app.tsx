import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import GlobalStyles from '@globalStyles/index';
import theme from '@globalStyles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BLUEONE</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <GlobalStyles />

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
          <Component {...pageProps} />
        </ConfigProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
