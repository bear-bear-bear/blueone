import type { FC } from 'react';
import { Empty } from 'antd';

type Props = {
  description?: string;
};

const EmptyContent: FC<Props> = ({ description }) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    imageStyle={{
      height: 60,
    }}
    description={description}
    style={{
      width: '95%',
      position: 'absolute',
      top: '42%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fafafa',
      fontWeight: 400,
      fontSize: '16px',
    }}
  />
);

export default EmptyContent;
