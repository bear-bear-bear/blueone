import { useMemo } from 'react';
import { GetListResponse } from '@/shared/api/types/works';
import addFloats from '@/shared/lib/utils/add-floats';

type Props = {
  works: GetListResponse;
};

export default function TotalFee({ works }: Props) {
  const totalFee = useMemo(() => {
    const initialValue = {
      charge: 0,
      subsidy: 0,
      payout: 0,
    };
    if (!works) return initialValue;

    return works.reduce((acc, work) => {
      acc.charge = addFloats(acc.charge, work.charge);
      acc.subsidy = addFloats(acc.subsidy ?? 0, work.subsidy ?? 0);
      acc.payout = addFloats(acc.payout, Number(work.payout));
      return acc;
    }, initialValue);
  }, [works]);

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
