import { FC, MouseEventHandler, useCallback, useState } from 'react';

import type { MyWorks } from '@components/User/WorkCarousel';
import type { EndPoint, Work } from '@typings';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import { Button, message } from 'antd';
import type { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';

type Props = {
  workId: Work['id'];
  isWorkChecked: boolean;
};
type PatchedWork = EndPoint['PATCH /works/{workId}']['responses']['200'];
type WorkPatchError =
  | EndPoint['PATCH /works/{workId}']['responses']['403']
  | EndPoint['PATCH /works/{workId}']['responses']['404']
  | EndPoint['PATCH /works/{workId}']['responses']['500'];

const CheckButton: FC<Props> = ({ workId, isWorkChecked }) => {
  const { data: works, mutate: mutateWorks } = useSWRImmutable<MyWorks>('/user/works', axiosFetcher);
  const [loading, setLoading] = useState<boolean>(false);

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
      type={isWorkChecked ? 'ghost' : 'primary'}
      disabled={isWorkChecked}
      size="large"
      onClick={handleClick}
      loading={loading}
      block
    >
      확인
    </Button>
  );
};

export default CheckButton;
