import { PropsWithChildren } from 'react';
import { Metadata, Viewport } from 'next';
import { pretendardVariable } from '@globalStyles/fonts';
import theme from '@globalStyles/theme';
import '@globalStyles/reset.css';
import Providers from './_providers';

const APP_NAME = 'BLUEONE';

export const metadata: Metadata = {
  title: APP_NAME,
  description: '탁송 서비스 관리 솔루션',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon_fill.svg',
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: theme.primaryColor,
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" dir="ltr">
      <body className={pretendardVariable.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
