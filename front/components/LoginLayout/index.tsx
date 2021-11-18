import React from 'react';
import Image from 'next/image';

import * as S from './styles';

const LoginLayout: React.FC = ({ children }) => (
  <S.CenterLayout>
    <S.FormWrapper>
      <S.Header>
        <Image src="/logo.jpg" width={140} height={35} unoptimized />
      </S.Header>
      {children}
    </S.FormWrapper>
  </S.CenterLayout>
);

export default LoginLayout;
