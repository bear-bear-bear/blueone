import { ReactElement } from 'react';
import { App } from 'antd';
import { Me, useSuspenseFetchMe } from '@/entities/me';
import type { Work } from '@/shared/api/types';
import useCheckWork from '../api/use-check-work.mutation';

type RenderProps = {
  check: () => void;
  canCheck: boolean;
};
type Props = {
  work: Pick<Work, 'id' | 'checkTime'>;
  children: (props: RenderProps) => ReactElement;
};

export default function CheckWork({ work, children }: Props) {
  const { message } = App.useApp();
  const { mutate: checkWork } = useCheckWork();
  const { data: me } = useSuspenseFetchMe();
  const insuranceInfo = Me.insuranceInfo(me);

  const canCheck = insuranceInfo.state !== 'expired' && !work.checkTime;

  const check = () => {
    if (!canCheck) return;

    checkWork(
      { workId: work.id },
      {
        onSuccess: () => {
          message.success('업무 확인 완료');
        },
      },
    );
  };

  return children({ check, canCheck });
}
