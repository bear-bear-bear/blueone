'use client';
import { Spin } from 'antd';
import type { SpinSize } from 'antd/es/spin';
import { useVerticalStretch } from '@/shared/lib/hooks/use-vertical-stretch.hook';
import styled from '@emotion/styled';

export default function LoadingPanel({ size = 'default' }: { size?: SpinSize }) {
  const setRef = useVerticalStretch<HTMLDivElement>();

  return (
    <Container ref={setRef}>
      <Spin size={size} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
