import styled from '@emotion/styled';
import media from '@utils/media';

export const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.section`
  width: 100%;
  padding: 1.33rem;

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
  margin-bottom: 0.66rem;
  padding: 0.33rem 0;
  gap: 1rem;

  h1 {
    font-size: 1.1rem;
  }

  ${media.sm} {
    margin-bottom: 1.33rem;
  }
`;
