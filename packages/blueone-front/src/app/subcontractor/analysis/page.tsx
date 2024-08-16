'use client';
import { Tabs } from 'antd';
import './page.css';
import { AnalyzeIncomeByDay, AnalyzeIncomeByMonth } from '@/features/subcontractor/analyze-income';

export default function AnalysisPage() {
  return (
    <Tabs
      defaultActiveKey="1"
      size="large"
      items={[
        { label: '일', key: '1', children: <AnalyzeIncomeByDay chartHeight={360} /> },
        { label: '월', key: '2', children: <AnalyzeIncomeByMonth chartHeight={360} /> },
      ]}
    />
  );
}
