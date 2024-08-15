import { memo, MouseEventHandler, useCallback, useState } from 'react';
import { App, Button } from 'antd';
import useSWRImmutable from 'swr/immutable';
import { Me, useSuspenseFetchMe } from '@/entities/me';
import httpClient from '@/shared/api/axios';
import type { EndPoint, Work } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';

type Props = {
  workId: Work['id'];
  isWorkChecked: boolean;
};
type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type PatchedWork = EndPoint['PATCH /works/{workId}']['responses']['200'];

const CheckButton = ({ workId, isWorkChecked }: Props) => {
  const { message } = App.useApp();
  const { data: me } = useSuspenseFetchMe();
  const { data: works, mutate: mutateWorks } = useSWRImmutable<MyWorks>('/user/works', axiosFetcher);
  const [loading, setLoading] = useState<boolean>(false);

  const insuranceInfo = Me.insuranceInfo(me);
  const buttonDisabled = insuranceInfo.state === 'expired' || isWorkChecked;

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
    setLoading(true);
    try {
      const patchedWork = await httpClient.patch<PatchedWork>(`/works/${workId}?state=checked`).then((res) => res.data);
      const nextWorks = works?.map((work) => (work.id !== patchedWork.id ? work : patchedWork));
      setLoading(false);
      await mutateWorks(nextWorks);
      message.success('업무 확인 완료', 4);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [works, workId, mutateWorks]);

  return (
    <Button
      type={buttonDisabled ? 'text' : 'primary'}
      disabled={buttonDisabled}
      size="large"
      onClick={handleClick}
      loading={loading}
      block
    >
      확인
    </Button>
  );
};

export default memo(CheckButton);
