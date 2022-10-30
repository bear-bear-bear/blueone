import { List, Divider } from 'antd';
import styled from '@emotion/styled';

const { Item } = List;
export const StyledItem = styled(Item)`
  :hover,
  :focus {
    background: #fafafa;
  }
`;

export const ListWrapper = styled.div`
  position: relative;
  max-width: 800px;
  max-height: 800px;
  overflow-y: auto;
  padding: 0 16px 16px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;

  ::-webkit-scrollbar {
    width: 10px;

    &-track {
      border: 1px solid #eee;
    }

    &-thumb {
      background: #ccc;
    }
  }
`;

export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 16px 8px 8px;
  background-color: inherit;
`;

export const StyledDivider = styled(Divider)`
  margin: 8px 0;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
