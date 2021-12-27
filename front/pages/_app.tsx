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
      <GlobalStyles />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
