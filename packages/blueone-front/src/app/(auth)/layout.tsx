import { ReactNode } from 'react';
import { RedirectType } from 'next/dist/client/components/redirect';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getMyServiceEntry } from '@/entities/me/api/get-my-service-entry';
import media from '@/shared/ui/foundation/media';
import theme from '@/shared/ui/foundation/theme';
import styled from '@emotion/styled';

export default async function LoginLayout({ children }: { children: ReactNode }) {
  try {
    const myServiceEntry = await getMyServiceEntry();

    return redirect(myServiceEntry, RedirectType.replace);
  } catch {
    // do nothing, maybe not logged in
  }

  return (
    <CenterLayout>
      <Box>
        <BoxHeader>
          <Image src="/logo_fill.svg" alt="로고" width={180} height={30} />
        </BoxHeader>
        {children}
      </Box>
    </CenterLayout>
  );
}

const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.section`
  width: 100%;
  padding: 1.33rem;

  ${media.sm} {
    border: 1px solid #ddd;
    border-radius: ${theme.borderRadius};
    width: 27rem;
  }
`;

const BoxHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.66rem;
  padding: 0.33rem 0;
  gap: 1rem;

  h1 {
    font-size: 1.1rem;
  }

  ${media.sm} {
    margin-bottom: 1.33rem;
  }
`;
