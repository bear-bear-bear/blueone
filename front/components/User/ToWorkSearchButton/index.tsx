import { Button } from 'antd';
import Link from 'next/link';

const ToWorkSearchButton = () => (
  <Button type="ghost" style={{ color: '#fff', borderRadius: '2px' }}>
    <Link href="/worker/work-search">
      <a>→ 지난 업무 열람</a>
    </Link>
  </Button>
);

export default ToWorkSearchButton;
