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
        <title>블루원</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
