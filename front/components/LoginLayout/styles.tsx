import styled from '@emotion/styled';
import media from '@utils/media';

export const CenterLayout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.section`
  width: 100%;
  padding: 1.33rem;
  
  ${media.sm} {
    border: 1px solid #ddd;
    width: 27rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 1.33rem;
  padding: 0.33rem 0;
`;
