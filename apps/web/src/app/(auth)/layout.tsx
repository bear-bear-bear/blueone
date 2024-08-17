import { RedirectType } from 'next/dist/client/components/redirect';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getMyServiceEntry } from '@/entities/me/api/get-my-service-entry';

export default async function SignInLayout({ children }: { children: ReactNode }) {
  try {
    const myServiceEntry = await getMyServiceEntry();

    return redirect(myServiceEntry, RedirectType.replace);
  } catch {
    // do nothing, maybe not logged in
  }

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
