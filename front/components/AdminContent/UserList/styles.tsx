import styled from '@emotion/styled';
import { List } from 'antd';

const { Item } = List;
export const StyledItem = styled(Item)`
  cursor: pointer;

  :hover,
  :focus {
    background: #fafafa;
  }
`;

export const ListWrapper = styled.div`
  max-width: 800px;
  max-height: 60%;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background: #fff;

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

export const SpinnerWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
