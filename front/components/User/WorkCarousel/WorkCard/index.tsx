import { FC } from 'react';
import { Card } from 'antd';
import { MdAttachMoney } from 'react-icons/md';
import type { Unpacked } from '@typings';
import type { MyWorks } from '../index';
import * as S from '../styles';
import CheckButton from '@components/User/WorkCarousel/WorkCard/CheckButton';
import DoneButton from '@components/User/WorkCarousel/WorkCard/DoneButton';

type MyWork = Unpacked<MyWorks>;
type Props = {
  work: MyWork;
};

const { Meta } = Card;

const InfoRow: FC<{ label: string; content: string }> = ({ label, content }) => (
  <S.Row>
    <p>{label}:</p>
    <p>{content}</p>
  </S.Row>
);

const WorkCard = ({ work }: Props) => {
  return (
    <S.StyledCard
      actions={[
        <CheckButton isWorkChecked={!!work.checkTime} workId={work.id} />,
        <DoneButton isWorkChecked={!!work.checkTime} workId={work.id} />,
      ]}
    >
      <Meta
        title={
          <p>
            <MdAttachMoney size={20} style={{ verticalAlign: 'text-bottom' }} />
            <span style={{ marginLeft: '0.33rem' }}>구간지수 {work.charge}</span>
          </p>
        }
        description={`지원지수 ${work.subsidy}`}
      />
      <S.WorkInfo>
        <InfoRow label="출발지" content={work.origin} />
        {work.waypoint && <InfoRow label="경유지" content={work.waypoint} />}
        <InfoRow label="도착지" content={work.destination} />
        <InfoRow label="차종" content={work.carModel} />
        {work.remark && <InfoRow label="비고" content={work.remark} />}
      </S.WorkInfo>
    </S.StyledCard>
  );
};

export default WorkCard;
