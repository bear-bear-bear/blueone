import { Button } from 'antd';
import Link from 'next/link';

const ToDoneWorkSearchButton = () => (
  <Button type="text" style={{ color: '#fff', borderRadius: '2px' }}>
    <Link href="/packages/blueone-front/app/worker/done-works/page">
      <a>→ 완료된 업무 열람</a>
    </Link>
  </Button>
);

export default ToDoneWorkSearchButton;
