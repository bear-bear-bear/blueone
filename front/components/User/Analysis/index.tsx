import { Tabs } from 'antd';
import * as S from './styles';

const { TabPane } = Tabs;

const Analysis = () => (
  <S.StyledTabs defaultActiveKey="1" size="large">
    <TabPane tab="이번 달" key="1">
      이번 달
    </TabPane>
    <TabPane tab="올해" key="2">
      올해
    </TabPane>
  </S.StyledTabs>
);

export default Analysis;
