import { ReactNode, useCallback, useState } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import useSWRImmutable from 'swr/immutable';
import httpClient from '@/shared/api/axios';
import type { EndPoint } from '@/shared/api/types';
import { axiosFetcher } from '@/shared/lib/utils/swr';
import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { NoticeList, ProcessedNotice } from './page';

type Props = {
  record: ProcessedNotice;
};
type Response = EndPoint['DELETE /notices/{noticeId}']['responses']['200'];
type RequestError =
  | EndPoint['DELETE /notices/{noticeId}']['responses']['404']
  | EndPoint['DELETE /notices/{noticeId}']['responses']['500'];

const Spinner = <LoadingOutlined style={{ fontSize: 12 }} spin />;

const INITIAL_POPOVER_TEXT = '공지사항 삭제';

const DeleteButton = ({ record }: Props) => {
  const { message } = App.useApp();
  const { data: noticeList, mutate: mutateNoticeList } = useSWRImmutable<NoticeList>(
    record.swrKey || '/notices',
    axiosFetcher,
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popoverText, setPopoverText] = useState<ReactNode>(INITIAL_POPOVER_TEXT);

  const showPopconfirm = () => {
    setIsPopoverOpen(true);
  };

  const deleteNotice = useCallback(async () => {
    setPopoverText(Spinner);

    try {
      await httpClient.delete<Response>(`/notices/${record.id}`);
      const nextNoticeList = noticeList?.filter((work) => work.id !== record.id);
      await mutateNoticeList(nextNoticeList);
      message.success('공지사항 삭제 완료');
    } catch (err) {
      setIsPopoverOpen(false);
      setPopoverText(INITIAL_POPOVER_TEXT);
      throw err;
    }
  }, [noticeList, record, mutateNoticeList]);

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popconfirm
        title={popoverText}
        open={isPopoverOpen}
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
