import { memo } from 'react';
import { Card, ConfigProvider, Tooltip, Typography, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import CheckButton from '@/components/subcontractor/work-card/check-button.component';
import DoneButton from '@/components/subcontractor/work-card/done-button.component';
import theme from '@/global-styles/theme';
import { EndPoint } from '@/shared/api/types';
import type { Unpacked } from '@/shared/api/types';
import { MoneyCollectOutlined } from '@ant-design/icons';
import * as S from './styles';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type MyWork = Unpacked<MyWorks>;
type Props = {
  work: MyWork;
  readOnly?: boolean;
};

const { Meta } = Card;
const { Paragraph } = Typography;

const WorkCard = ({ work, readOnly = false }: Props) => {
  const isWorkChecked = !!work.checkTime;
  const isWorkDone = !!work.endTime;

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
      }}
      button={{
        style: {
          borderRadius: 'unset',
        },
      }}
    >
      <S.StyledCard
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
        styles={{
          body: {
            backgroundColor: isWorkDone ? '#F5F5F5' : '#FFF',
          },
        }}
        readOnly={readOnly}
      >
        {isWorkDone && <WorkDoneStamp />}
        {readOnly && !!work.endTime && (
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <b>{dayjs(work.endTime).format('MM-DD')}</b>
          </p>
        )}
        <Meta
          title={
            <p>
              <MoneyCollectOutlined style={{ fontSize: '24px' }} />
              <span style={{ marginLeft: '0.33rem' }}>최종지수 {work.payout}</span>
            </p>
          }
          description={
            <div>
              <p>* 구간지수 {work.charge}</p>
              {!!work.adjustment &&
                (work.adjustment > 0 ? (
                  <p>
                    * 할증 <span style={{ color: theme.primaryColor }}>{work.adjustment}</span>
                  </p>
                ) : (
                  <p>
                    * 할인 <span style={{ color: theme.primaryColor }}>{Math.abs(work.adjustment as number)}</span>
                  </p>
                ))}
              {!!work.subsidy && (
                <p>
                  * 지원지수 <span style={{ color: theme.primaryColor }}>{work.subsidy}</span>
                </p>
              )}
            </div>
          }
        />
        <S.WorkInfo>
          <InfoRow label="출발지" content={work.origin} copyable={!readOnly} />
          {work.waypoint && <InfoRow label="경유지" content={work.waypoint} copyable={!readOnly} />}
          <InfoRow label="도착지" content={work.destination} copyable={!readOnly} />
          <InfoRow label="차종" content={work.carModel} />
          {work.remark && <InfoRow label="비고" content={work.remark} />}
        </S.WorkInfo>
      </S.StyledCard>
    </ConfigProvider>
  );
};

function WorkDoneStamp() {
  return (
    <Tooltip title="완료된 업무예요.">
      <S.WorkDoneStamp size={45} />
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
      <p className="label">{label}:</p>
      <Paragraph className="content" copyable={copyable}>
        {content}
      </Paragraph>
    </>
  );
}

export default memo(WorkCard);
