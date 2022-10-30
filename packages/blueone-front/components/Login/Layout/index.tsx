import type { FC } from 'react';
import Image from 'next/image';
import * as S from './styles';

const LoginLayout: FC = ({ children }) => (
  <S.CenterLayout>
    <S.Box>
      <S.BoxHeader>
        <Image src="/logo_fill.svg" alt="로고" width={180} height={30} />
      </S.BoxHeader>
      {children}
    </S.Box>
  </S.CenterLayout>
);

export default LoginLayout;
