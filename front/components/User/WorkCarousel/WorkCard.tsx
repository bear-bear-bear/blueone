import { FC } from 'react';
import { Button, Card } from 'antd';
import { MdAttachMoney } from 'react-icons/md';
import type { Unpacked } from '@typings';
import type { MyWorks } from './index';
import * as S from './styles';

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
        <Button type={work.checkTime ? 'ghost' : 'primary'} disabled={!!work.checkTime} block>
          확인
        </Button>,
        <Button type={work.checkTime ? 'primary' : 'ghost'} disabled={!work.checkTime} block>
          완료
        </Button>,
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
      </S.WorkInfo>
    </S.StyledCard>
  );
};

export default WorkCard;
