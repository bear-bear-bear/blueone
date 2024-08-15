import { PropsWithChildren } from 'react';
import { Metadata, Viewport } from 'next';
import { MeHydration } from '@/entities/me';
import { pretendardVariable } from '@/shared/ui/fonts';
import theme from '@/shared/ui/foundation/theme';
import Providers from './_providers';
import '@/shared/ui/foundation/global.css';

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
  themeColor: theme.colors.primary,
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" dir="ltr">
      <body className={pretendardVariable.className}>
        <Providers>
          <MeHydration>{children}</MeHydration>
        </Providers>
      </body>
    </html>
  );
}
