'use client';
import { ReactNode, useEffect } from 'react';
import { App, Button, ConfigProvider, theme } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useFetchMe } from '@/entities/me';
import cn from '@/shared/lib/utils/cn';
import { ArrowLeftOutlined } from '@ant-design/icons';
import navItems, { type NavItem } from './nav-items';

export default function SubcontractorLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const headerText = navItems.find((item) => item.href === pathname)?.text;
  const bodyNoPadding = ['analysis', 'settings'].some((v) => pathname.endsWith(v));
  const showBack = ['completed-works'].some((v) => pathname.endsWith(v));

  const goBack = () => {
    router.back();
  };

  useContractWarning();

  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <App notification={{ maxCount: 1 }}>
          <div className="w-full max-w-lg h-screen mx-auto flexRowCenter bg-gray-950">
            <div className="w-full h-full flex flex-col">
              <header className="relative flex justify-center items-center mb-5 p-4 gap-4">
                {showBack && (
                  <Button
                    className="absolute left-4 text-white"
                    type="text"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={goBack}
                  />
                )}
                <h1 className="text-2xl text-white">{headerText}</h1>
              </header>

              <main
                className={cn('flex-1 flex flex-col relative overflow-y-auto scrollbar-hide', {
                  'p-4': !bodyNoPadding,
                })}
              >
                {children}
              </main>

              <footer className="bg-black px-4">
                <nav className="flex justify-between">
                  {navItems.map((item) => {
                    if (item.parentPageHref) {
                      return null;
                    }
                    const isParentOfCurrPage = !!navItems.find(
                      (t) => t.parentPageHref && t.parentPageHref === item.href && t.href === pathname,
                    );
                    return (
                      <NavItem key={item.href} item={item} active={item.href === pathname || isParentOfCurrPage} />
                    );
                  })}
                </nav>
              </footer>
            </div>
          </div>
        </App>
      </ConfigProvider>

      <style jsx global>
        {`
          body {
            background: #1c1c1c;
          }
        `}
      </style>
    </>
  );
}

function NavItem({ item, active }: { active: boolean; item: NavItem }) {
  return (
    <Link href={item.href} className={cn('flex-1 flexColCenter gap-2 py-4', active ? '!text-white' : '!text-gray-500')}>
      {active ? item.fillIcon : item.outlineIcon}
      <p className="text-sm text-center">{item.text}</p>
    </Link>
  );
}

function useContractWarning() {
  const { message } = App.useApp();
  const { data: me } = useFetchMe();

  useEffect(() => {
    if (me?.role === 'contractor') {
      message.info('Subcontractor 전용 페이지입니다.');
    }
  }, [me]);
}
