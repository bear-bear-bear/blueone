import styled from '@emotion/styled';
import media from '@utils/media';

export const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BOX_ITEM_PADDING = '0.66rem 1.66rem';

export const Box = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #141414;

  ${media.sm} {
    border: 1px solid #ddd;
    border-radius: 2px;
    width: 27rem;
  }
`;

export const BoxHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.33rem;
  padding: ${BOX_ITEM_PADDING};
  gap: 1rem;

  h1 {
    font-size: 1.1rem;
  }
`;

export const BoxMain = styled.main`
  flex: 1;
  padding: ${BOX_ITEM_PADDING};
`;

export const BoxFooter = styled.footer`
  nav {
    display: flex;
    justify-content: space-between;
    padding: ${BOX_ITEM_PADDING};
    background-color: #000;

    a {
      color: #fafafa;

      div {
        display: flex;
        flex-direction: column;
        gap: 0.33rem;

        p {
          font-size: 10px;
          font-weight: 100;
        }
      }
    }
  }
`;
