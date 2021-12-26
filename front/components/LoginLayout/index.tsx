import type { FC } from 'react';
import Image from 'next/image';

import * as S from './styles';

const LoginLayout: FC = ({ children }) => (
  <S.CenterLayout>
    <S.Box>
      <S.BoxHeader>
        <Image src="/logo.jpg" alt="로고" width={120} height={30} unoptimized />
      </S.BoxHeader>
      {children}
    </S.Box>
  </S.CenterLayout>
);

export default LoginLayout;
