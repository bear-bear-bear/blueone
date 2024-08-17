import { Button, Card, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { CheckWork } from '@/features/subcontractor/check-work';
import { CompleteWork } from '@/features/subcontractor/complete-work';
import { Work } from '@/shared/api/types';
import cn from '@/shared/lib/utils/cn';
import { CheckCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';

type Props = {
  work: Work;
  readOnly?: boolean;
  className?: string;
};

export default function WorkCard({ work, readOnly = false, className }: Props) {
  return (
    <Card
      bordered={false}
      className={cn('relative max-h-[70vh] overflow-auto', className)}
      actions={
        readOnly
          ? undefined
          : [
              <CheckWork key={`check_${work.id}`} work={work}>
                {({ check, canCheck }) => (
                  <Button
                    type={canCheck ? 'primary' : 'text'}
                    className="rounded-none"
                    disabled={!canCheck}
                    size="large"
                    onClick={check}
                    block
                  >
                    확인
                  </Button>
                )}
              </CheckWork>,
              <CompleteWork key={`complete_${work.id}`} work={work}>
                {({ complete, canComplete }) => (
                  <Button
                    type={canComplete ? 'primary' : 'text'}
                    className="rounded-none"
                    disabled={!canComplete}
                    size="large"
                    onClick={complete}
                    block
                  >
                    완료
                  </Button>
                )}
              </CompleteWork>,
            ]
      }
    >
      {!!work.endTime && <WorkDoneStamp />}

      {readOnly && !!work.endTime && (
        <p className="text-lg mb-2">
          <b>{dayjs(work.endTime).format('MM-DD')}</b>
        </p>
      )}

      <Card.Meta
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
}

function WorkDoneStamp() {
  return (
    <Tooltip title="완료된 업무예요.">
      <CheckCircleOutlined className="absolute top-4 right-4 text-primary text-[45px]" />
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
      <Typography.Paragraph className="text-base" copyable={copyable}>
        {content}
      </Typography.Paragraph>
    </>
  );
}
