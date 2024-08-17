import type { Work } from '@/models';
import addFloats from './add-floats';

export default function calculatePayout(work: Work): number {
  const payout =
    addFloats(work.charge + (work.subsidy ?? 0) + (work.adjustment ?? 0)) * 0.8;

  return parseFloat(payout.toFixed(2));
}

export function withPayout(work: Work): Work & { payout: number } {
  return {
    ...work.get(),
    payout: calculatePayout(work),
  };
}
