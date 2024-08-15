'use client';
import { Tabs } from 'antd';
import AnalyzeByDay from './analyze-by-day.component';
import AnalyzeByMonth from './analyze-by-month.component';
import './page.css';

export default function AnalysisPage() {
  return (
    <Tabs
      defaultActiveKey="1"
      size="large"
      items={[
        { label: '일', key: '1', children: <AnalyzeByDay /> },
        { label: '월', key: '2', children: <AnalyzeByMonth /> },
      ]}
    />
  );
}
