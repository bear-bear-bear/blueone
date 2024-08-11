import { memo, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { App, Button } from 'antd';
import type { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';
import type { EndPoint, Work } from '@typings';
import useUser from '@hooks/useUser';
import httpClient, { logAxiosError } from '@utils/axios';
import getInsuranceExpirationInfo from '@utils/getInsuranceExpirationInfo';
import { axiosFetcher } from '@utils/swr';

type Props = {
  workId: Work['id'];
  isWorkChecked: boolean;
};
type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type PatchedWork = EndPoint['PATCH /works/{workId}']['responses']['200'];
type WorkPatchError =
  | EndPoint['PATCH /works/{workId}']['responses']['403']
  | EndPoint['PATCH /works/{workId}']['responses']['404']
  | EndPoint['PATCH /works/{workId}']['responses']['500'];

const CheckButton = ({ workId, isWorkChecked }: Props) => {
  const { message } = App.useApp();
  const { user } = useUser();
  const insuranceDate = getInsuranceExpirationInfo(user);
  const { data: works, mutate: mutateWorks } = useSWRImmutable<MyWorks>('/user/works', axiosFetcher);
  const [loading, setLoading] = useState<boolean>(false);
  const buttonDisabled = useMemo(() => {
    return insuranceDate.state === 'danger' || isWorkChecked;
  }, [insuranceDate.state, isWorkChecked]);

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
      logAxiosError<WorkPatchError>(err as AxiosError<WorkPatchError>);
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
