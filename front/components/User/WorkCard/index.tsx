import { FC, useMemo } from 'react';
import { Card, Tooltip, Typography } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import type { Unpacked } from '@typings';
import CheckButton from '@components/User/WorkCard/CheckButton';
import DoneButton from '@components/User/WorkCard/DoneButton';
import { EndPoint } from '@typings';
import dayjs from 'dayjs';
import * as S from './styles';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type MyWork = Unpacked<MyWorks>;
type Props = {
  work: MyWork;
  readOnly?: boolean;
};

const { Meta } = Card;
const { Paragraph } = Typography;

const WorkDoneStamp = () => (
  <Tooltip title="완료된 업무예요.">
    <S.WorkDoneStamp size={45} />
  </Tooltip>
);

const InfoRow: FC<{ label: string; content: string; copyable?: boolean }> = ({ label, content, copyable = false }) => (
  <S.Row>
    <p>{label}:</p>

    {copyable ? (
      <Paragraph style={{ marginBottom: 0 }} copyable>
        {content}
      </Paragraph>
    ) : (
      <p>{content}</p>
    )}
  </S.Row>
);

const emphasisStyle = {
  color: 'red',
  fontWeight: 500,
};

const WorkCard = ({ work, readOnly = false }: Props) => {
  const isWorkChecked = !!work.checkTime;
  const isWorkDone = !!work.endTime;

  // 지원지수가 음수라면 수식을 다르게 해달라는 요청사항 반영
  const subsidy = work.subsidy ?? 0;
  const payout = subsidy >= 0 ? ((work.charge + subsidy) * 8) / 10 : (work.charge * 8) / 10 + subsidy;

  return (
    <S.StyledCard
      actions={
        readOnly
          ? undefined
          : [
              <CheckButton isWorkChecked={isWorkChecked} workId={work.id} key={`c_${work.id}`} />,
              <DoneButton
                isWorkChecked={isWorkChecked}
                isWorkDone={isWorkDone}
                workId={work.id}
                key={`d_${work.id}`}
              />,
            ]
      }
      bodyStyle={{
        backgroundColor: isWorkDone ? '#F5F5F5' : '#FFF',
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
            <span style={{ marginLeft: '0.33rem' }}>최종지수 {payout}</span>
          </p>
        }
        description={
          <div>
            <p>* 구간지수 {work.charge}</p>
            {subsidy !== 0 && (
              <p>* 지원지수{' '}
                <span style={subsidy < 0 ? emphasisStyle : undefined}>{subsidy}</span>
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
  );
};

export default WorkCard;
