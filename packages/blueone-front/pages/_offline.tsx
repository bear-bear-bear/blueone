import { Empty } from 'antd';
import { NextPage } from 'next';

const OfflinePage: NextPage = () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Empty style={{ paddingBottom: '2rem' }} description={<p>인터넷을 연결할 수 없어요 :(</p>} />
  </div>
);

export default OfflinePage;
