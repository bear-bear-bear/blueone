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

  .ant-tabs-content {
    padding: 0 1rem;
    overflow-y: auto !important;
    max-height: 70vh;
  }
`;

export const Header = styled.header`
  margin-top: 1rem;
  margin-bottom: 1.66rem;

  h1 {
    color: #fff;
    font-size: 1.33rem;
  }
`;
