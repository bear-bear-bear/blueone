import type { AppProps } from 'next/app';
import GlobalStyles from '@globalStyles/index';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
