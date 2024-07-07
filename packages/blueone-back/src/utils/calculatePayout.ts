import type { Work } from '@/models';

export default function calculatePayout(
  charge: Work['charge'],
  subsidy: Work['subsidy'],
): number {
  const _subsidy = subsidy ?? 0;

  // 지원지수가 음수라면 수식을 다르게 해달라는 요청사항 반영
  return _subsidy >= 0 ? (charge + _subsidy) * 0.8 : charge * 0.8 + _subsidy;
}

export function withPayout(work: Work): Work & { payout: number } {
  return {
    ...work.get(),
    payout: calculatePayout(work.charge, work.subsidy),
  };
}
