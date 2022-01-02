import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Button, message } from 'antd';
import httpClient from '@utils/axios';
import useSWRImmutable from 'swr/immutable';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint, Work } from '@typings';
import type { MyWorks } from '@components/User/WorkCarousel';

type Props = {
  workId: Work['id'];
  isWorkChecked: boolean;
};
type PatchedWork = EndPoint['PATCH /works/{workId}']['responses']['200'];

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
      message.error('서버에 문제가 있는 것 같아요! 사장님에게 문의해주세요.', 4);
      console.error(err);
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
