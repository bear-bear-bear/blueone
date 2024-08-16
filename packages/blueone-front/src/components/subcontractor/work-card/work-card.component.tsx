import { memo } from 'react';
import { Card, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import CheckButton from '@/components/subcontractor/work-card/check-button.component';
import DoneButton from '@/components/subcontractor/work-card/done-button.component';
import { EndPoint } from '@/shared/api/types';
import type { Unpacked } from '@/shared/api/types';
// Optional if you use Tailwind's theme system
import cn from '@/shared/lib/utils/cn';
import { CheckCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type MyWork = Unpacked<MyWorks>;
type Props = {
  work: MyWork;
  readOnly?: boolean;
  className?: string;
};

const { Meta } = Card;
const { Paragraph } = Typography;

const WorkCard = ({ work, readOnly = false, className }: Props) => {
  const isWorkChecked = !!work.checkTime;
  const isWorkDone = !!work.endTime;

  return (
    <Card
      bordered={false}
      className={cn('relative max-h-[70vh] overflow-auto', className)}
      actions={
        readOnly
          ? undefined
          : [
              <CheckButton key={`c_${work.id}`} isWorkChecked={isWorkChecked} workId={work.id} />,
              <DoneButton
                key={`d_${work.id}`}
                isWorkChecked={isWorkChecked}
                isWorkDone={isWorkDone}
                workId={work.id}
              />,
            ]
      }
    >
      {isWorkDone && <WorkDoneStamp />}
      {readOnly && !!work.endTime && (
        <p className="text-lg mb-2">
          <b>{dayjs(work.endTime).format('MM-DD')}</b>
        </p>
      )}
      <Meta
        title={
          <p className="flex items-center text-lg">
            <MoneyCollectOutlined className="text-2xl" />
            <span className="ml-2">최종지수 {work.payout}</span>
          </p>
        }
        description={
          <div>
            <p>* 구간지수 {work.charge}</p>
            {!!work.adjustment &&
              (work.adjustment > 0 ? (
                <p>
                  * 할증 <span className="text-primary">{work.adjustment}</span>
                </p>
              ) : (
                <p>
                  * 할인 <span className="text-primary">{Math.abs(work.adjustment as number)}</span>
                </p>
              ))}
            {!!work.subsidy && (
              <p>
                * 지원지수 <span className="text-primary">{work.subsidy}</span>
              </p>
            )}
          </div>
        }
      />
      <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 mt-6">
        <InfoRow label="출발지" content={work.origin} copyable={!readOnly} />
        {work.waypoint && <InfoRow label="경유지" content={work.waypoint} copyable={!readOnly} />}
        <InfoRow label="도착지" content={work.destination} copyable={!readOnly} />
        <InfoRow label="차종" content={work.carModel} />
        {work.remark && <InfoRow label="비고" content={work.remark} />}
      </div>
    </Card>
  );
};

function WorkDoneStamp() {
  return (
    <Tooltip title="완료된 업무예요.">
      <CheckCircleOutlined size={45} className="absolute top-4 right-4 text-primary" />
    </Tooltip>
  );
}

type InfoRowProps = {
  label: string;
  content: string;
  copyable?: boolean;
};
function InfoRow({ label, content, copyable = false }: InfoRowProps) {
  return (
    <>
      <p className="text-right">{label}:</p>
      <Paragraph className="text-base" copyable={copyable}>
        {content}
      </Paragraph>
    </>
  );
}

export default memo(WorkCard);
