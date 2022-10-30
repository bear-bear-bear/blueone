import { Tabs } from 'antd';

import * as S from './styles';

import AnalysisByDay from '@components/User/Analysis/AnalysisByDay';
import AnalysisByMonth from '@components/User/Analysis/AnalysisByMonth';

const { TabPane } = Tabs;

const Analysis = () => (
  <>
    <S.StyledTabs defaultActiveKey="1" size="large">
      <TabPane tab="일" key="1">
        <AnalysisByDay />
      </TabPane>
      <TabPane tab="월" key="2">
        <AnalysisByMonth />
      </TabPane>
    </S.StyledTabs>
    {/* <S.TempVerticalCenterLayout> */}
    {/*    <section> */}
    {/*        <AnalysisByMonth /> */}
    {/*    </section> */}
    {/* </S.TempVerticalCenterLayout> */}
  </>
);

export default Analysis;
