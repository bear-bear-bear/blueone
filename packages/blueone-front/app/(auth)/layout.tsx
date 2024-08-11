'use client';
import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import theme from '@globalStyles/theme';
import useUser from '@hooks/useUser';
import media from '@utils/media';

export default function LoginLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoggedIn, isNotFetched } = useUser();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      router.push('/admin/works');
    } else {
      router.push('/worker');
    }
  }, [isLoggedIn, router, user]);

  if (isNotFetched) {
    return (
      <CenterLayout>
        <LoadingOutlined style={{ fontSize: 20 }} spin />
      </CenterLayout>
    );
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
