import { ReactNode, useCallback, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { AxiosError } from 'axios';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { FullWorks, ProcessedWork } from './index';

type Props = {
  record: ProcessedWork;
};
type Response = EndPoint['DELETE /works/{workId}']['responses']['200'];
type RequestError =
  | EndPoint['DELETE /works/{workId}']['responses']['404']
  | EndPoint['DELETE /works/{workId}']['responses']['500'];

const Spinner = <LoadingOutlined style={{ fontSize: 12 }} spin />;

const DeleteButton = ({ record }: Props) => {
  const INITIAL_POPOVER_TEXT = '업무 삭제';
  const { data: works, mutate: mutateWorks } = useSWRImmutable<FullWorks>(record.swrKey, axiosFetcher);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popoverText, setPopoverText] = useState<ReactNode>(INITIAL_POPOVER_TEXT);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const deleteWork = useCallback(async () => {
    setPopoverText(Spinner);

    try {
      await httpClient.delete<Response>(`/works/${record.id}`);
      const nextWorks = works!.filter((work) => work.id !== record.id);
      await mutateWorks(nextWorks);
      message.success('업무 삭제 완료');
    } catch (err) {
      setIsPopoverOpen(false);
      setPopoverText(INITIAL_POPOVER_TEXT);
      logAxiosError<RequestError>(err as AxiosError<RequestError>);
    }
  }, [works, record, mutateWorks]);

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title={popoverText}
        visible={isPopoverOpen}
        onConfirm={deleteWork}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      >
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            style={{ color: record.isDone ? '#7C3A38' : '#ff4d4f' }}
            onClick={showPopconfirm}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
};

export default DeleteButton;
