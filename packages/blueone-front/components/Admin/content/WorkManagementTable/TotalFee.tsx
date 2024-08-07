import { FC, useMemo } from 'react';
import addFloats from '@utils/addFloats';
import type { ProcessedWork } from './index';

type Props = {
  workData: ProcessedWork[];
};

const TotalFee: FC<Props> = ({ workData }) => {
  const totalFee = useMemo(() => {
    const initialValue: { [key in keyof Pick<ProcessedWork, 'charge' | 'subsidy' | 'payout'>]: number } = {
      charge: 0,
      subsidy: 0,
      payout: 0,
    };
    if (!workData) return initialValue;

    return workData.reduce((acc, work) => {
      acc.charge = addFloats(acc.charge, work.charge);
      acc.subsidy = addFloats(acc.subsidy, work.subsidy ?? 0);
      acc.payout = addFloats(acc.payout, Number(work.payout));
      return acc;
    }, initialValue);
  }, [workData]);

  return (
    <section style={{ display: 'flex', gap: '0.33rem' }}>
      <p>
        구간합계: <b>{totalFee.charge.toLocaleString()}</b>,
      </p>
      <p>
        지원합계: <b>{totalFee.subsidy.toLocaleString()}</b>,
      </p>
      <p>
        최종합계: <b>{totalFee.payout.toLocaleString()}</b>
      </p>
    </section>
  );
};

export default TotalFee;
