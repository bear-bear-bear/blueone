import { Menu, Layout } from 'antd';
import styled from '@emotion/styled';

export const StyledHeader = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: #fff;
`;

export const StyledMenuDevider = styled(Menu.Divider)`
  background-color: #000810 !important;
  border-color: #000810 !important;
  color: #000810 !important;
`;

export const LogoWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: 16px;
  min-height: 52px;
`;
