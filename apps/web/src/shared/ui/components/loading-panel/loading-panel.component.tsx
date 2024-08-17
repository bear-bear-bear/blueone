'use client';
import { Spin } from 'antd';
import type { SpinSize } from 'antd/es/spin';
import { useVerticalStretch } from '@/shared/lib/hooks/use-vertical-stretch.hook';

export default function LoadingPanel({ size = 'default' }: { size?: SpinSize }) {
  const setRef = useVerticalStretch<HTMLDivElement>();

  return (
    <div ref={setRef} className="w-full flexColCenter p-5">
      <Spin size={size} />
    </div>
  );
}
