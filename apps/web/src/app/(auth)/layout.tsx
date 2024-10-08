'use client';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flexColCenter">
      <div className="w-full p-6 sm:border sm:border-solid sm:border-gray-300 sm:rounded-lg sm:w-[27rem]">
        <header className="flexRowCenter mb-4 gap-4 sm:mb-6">
          <Image src="/logo_fill.svg" alt="로고" width={150} height={30} />
        </header>
        {children}
      </div>
    </div>
  );
}
