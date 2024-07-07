import type { Work } from '@/models';

export default function calculatePayout(work: Work): number {
  return (work.charge + (work.subsidy ?? 0) + (work.adjustment ?? 0)) * 0.8;
}

export function withPayout(work: Work): Work & { payout: number } {
  return {
    ...work.get(),
    payout: calculatePayout(work),
  };
}
