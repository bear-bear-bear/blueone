import { PaymentType } from 'typings';
import type { Work } from '@/models';
import addFloats from './add-floats';

type Payout = {
  payout: number;
  fee: number;
};

export function withPayout(work: Work): Work & Payout {
  return {
    ...work.get(),
    ...calculatePayout(work),
  };
}

export default function calculatePayout(work: Work): Payout {
  switch (work.paymentType) {
    case PaymentType.CASH:
      return calculateCashPayout(work);
    case PaymentType.DIRECT:
      return calculateDirectPayout(work);
    default:
      throw new Error('지불 유형이 잘못되었습니다.');
  }
}

/**
 * 직접지불 = (구간지수 + 할인/할증 + 지원) * 0.8
 */
function calculateDirectPayout(work: Work): Payout {
  const directPayout =
    addFloats(work.charge, work.adjustment ?? 0, work.subsidy ?? 0) * 0.8;

  return {
    payout: parseFloat(directPayout.toFixed(2)),
    fee: 0,
  };
}

/**
 * 현금지불 = 구간지수 + 할인/할증
 * 정산_수수료 = 현금지불 * 0.2 - 지원 * 0.8
 */
function calculateCashPayout(work: Work): Payout {
  const cashPayout = addFloats(work.charge, work.adjustment ?? 0);
  const fee = cashPayout * 0.2 - (work.subsidy ?? 0) * 0.8;

  return {
    payout: parseFloat(cashPayout.toFixed(2)),
    fee: parseFloat(fee.toFixed(2)),
  };
}
