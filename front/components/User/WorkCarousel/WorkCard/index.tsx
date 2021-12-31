import { FC } from 'react';
import { Card, Typography } from 'antd';
import { MdAttachMoney } from 'react-icons/md';
import type { Unpacked } from '@typings';
import CheckButton from '@components/User/WorkCarousel/WorkCard/CheckButton';
import DoneButton from '@components/User/WorkCarousel/WorkCard/DoneButton';
import { EndPoint } from '@typings';
import * as S from '../styles';

type MyWorks = EndPoint['GET /user/works']['responses']['200'];
type MyWork = Unpacked<MyWorks>;
type Props = {
  work: MyWork;
};

const { Meta } = Card;
const { Paragraph } = Typography;

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

const WorkCard = ({ work }: Props) => (
  <S.StyledCard
    actions={[
      <CheckButton isWorkChecked={!!work.checkTime} workId={work.id} key={`c_${work.id}`} />,
      <DoneButton isWorkChecked={!!work.checkTime} workId={work.id} key={`d_${work.id}`} />,
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
      <InfoRow label="출발지" content={work.origin} copyable />
      {work.waypoint && <InfoRow label="경유지" content={work.waypoint} copyable />}
      <InfoRow label="도착지" content={work.destination} copyable />
      <InfoRow label="차종" content={work.carModel} />
      {work.remark && <InfoRow label="비고" content={work.remark} />}
    </S.WorkInfo>
  </S.StyledCard>
);

export default WorkCard;
