import styled from '@emotion/styled';
import { Tabs } from 'antd';

export const StyledTabs = styled(Tabs)`
  display: flex;
  color: #aaa;

  .ant-tabs-nav::before {
    border-bottom: 1px solid #777 !important;
  }

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

    :hover {
      color: #fff !important;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #fff !important;
    }
  }

  .ant-tabs-ink-bar {
    background-color: #fff !important;
  }
`;
