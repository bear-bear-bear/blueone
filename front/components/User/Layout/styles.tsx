import styled from '@emotion/styled';

export const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
`;

const BOX_ITEM_PADDING = '0.66rem 1rem';

export const Box = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BoxHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.33rem;
  padding: ${BOX_ITEM_PADDING};
  padding-top: 1rem;
  gap: 1rem;

  button.go-back {
    position: absolute;
    left: 2rem;
    color: #fff;
  }

  h1 {
    font-size: 1.33rem;
    font-weight: 400;
    color: #fff;
  }
`;

export const BoxMain = styled.main<{ noPadding?: boolean }>`
  flex: 1;
  padding: ${({ noPadding }) => (noPadding ? 'initial' : BOX_ITEM_PADDING)};
  position: relative;
  overflow-y: auto;
`;

export const BoxFooter = styled.footer`
  nav {
    display: flex;
    justify-content: space-between;
    padding: ${BOX_ITEM_PADDING};
    background-color: #000;
  }
`;

export const ActiveAnchor = styled.a<{ active: boolean }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0.33rem;
  color: ${({ active }) => (active ? '#fff' : '#aaa')} !important;

  p {
    font-size: 14px;
    font-weight: 100;
    text-align: center;
  }
`;
