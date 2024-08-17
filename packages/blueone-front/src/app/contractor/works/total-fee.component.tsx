import { useMemo } from 'react';
import type { ProcessedWork } from '@/app/contractor/works/page';
import addFloats from '@/shared/lib/utils/add-floats';

type Props = {
  workData: ProcessedWork[];
};

export default function TotalFee({ workData }: Props) {
  const totalFee = useMemo(() => {
    const initialValue = {
      charge: 0,
      subsidy: 0,
      payout: 0,
    };
    if (!workData) return initialValue;

    return workData.reduce((acc, work) => {
      acc.charge = addFloats(acc.charge, work.charge);
      acc.subsidy = addFloats(acc.subsidy ?? 0, work.subsidy ?? 0);
      acc.payout = addFloats(acc.payout, Number(work.payout));
      return acc;
    }, initialValue);
  }, [workData]);

  return (
    <div className="flex gap-1.5">
      <p>
        구간합계: <b>{totalFee.charge.toLocaleString()}</b>,
      </p>
      <p>
        지원합계: <b>{totalFee.subsidy.toLocaleString()}</b>,
      </p>
      <p>
        최종합계: <b>{totalFee.payout.toLocaleString()}</b>
      </p>
    </div>
  );
}
