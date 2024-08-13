'use client';
import { Tabs } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AnalysisByDay from './AnalysisByDay';
import AnalysisByMonth from './AnalysisByMonth';

export default function Analysis() {
  return (
    <StyledTabs
      defaultActiveKey="1"
      size="large"
      items={[
        { label: '일', key: '1', children: <AnalysisByDay /> },
        { label: '월', key: '2', children: <AnalysisByMonth /> },
      ]}
    />
  );
}

const waterfallFlexGrow = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTabs = styled(Tabs)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .ant-tabs-nav-list {
    flex: 1;
    gap: 1rem;
    padding: 0 1rem;
  }

  .ant-tabs-tab {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 !important;
    padding-top: 8px !important;
  }

  .ant-tabs-content-holder {
    ${waterfallFlexGrow};

    .ant-tabs-content {
      ${waterfallFlexGrow};
      padding: 0 1rem;
      overflow-y: auto !important;
      position: static;

      .ant-tabs-tabpane-active {
        ${waterfallFlexGrow};
      }
    }
  }
`;
