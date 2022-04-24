import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import GlobalStyles from '@globalStyles/index';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: 2000,
        errorRetryInterval: 5000,
      }}
    >
      <Head>
        <title>BLUEONE</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
