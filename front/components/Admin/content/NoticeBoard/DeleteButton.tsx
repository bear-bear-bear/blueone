import { ReactNode, useCallback, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { AxiosError } from 'axios';
import httpClient, { logAxiosError } from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import type { NoticeList, ProcessedNotice } from './index';

type Props = {
  record: ProcessedNotice;
};
type Response = EndPoint['DELETE /notice/{noticeId}']['responses']['200'];
type RequestError =
  | EndPoint['DELETE /notice/{noticeId}']['responses']['404']
  | EndPoint['DELETE /notice/{noticeId}']['responses']['500'];

const Spinner = <LoadingOutlined style={{ fontSize: 12 }} spin />;

const DeleteButton = ({ record }: Props) => {
  const INITIAL_POPOVER_TEXT = '공지사항 삭제';
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<NoticeList>(
    record.swrKey || '/notice',
    axiosFetcher,
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popoverText, setPopoverText] = useState<ReactNode>(INITIAL_POPOVER_TEXT);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const deleteNotice = useCallback(async () => {
    setPopoverText(Spinner);

    console.log(record);
    try {
      await httpClient.delete<Response>(`/notice/${record.id}`);
      const nextNoticeList = noticeList!.filter((work) => work.id !== record.id);
      await mutateNoticeList(nextNoticeList);
      message.success('공지사항 삭제 완료');
    } catch (err) {
      setIsPopoverOpen(false);
      setPopoverText(INITIAL_POPOVER_TEXT);
      logAxiosError<RequestError>(err as AxiosError<RequestError>);
    }
  }, [noticeList, record, mutateNoticeList]);

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title={popoverText}
        visible={isPopoverOpen}
        onConfirm={deleteNotice}
        okText="삭제"
        okButtonProps={{ danger: true }}
        onCancel={handleCancel}
        cancelText="취소"
        icon={<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />}
      >
        <Tooltip title="삭제">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            style={{ color: '#ff4d4f' }}
            onClick={showPopconfirm}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
};

export default DeleteButton;
