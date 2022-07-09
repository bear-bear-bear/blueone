import styled from '@emotion/styled';

import media from '@utils/media';

export const Container = styled.div`
  max-width: 500px;

  & > .ant-form {
    width: 100%;

    .ant-form-item-label {
      label {
        height: fit-content;

        ${media.sm} {
          height: 32px;
        }
      }
    }

    .ant-form-item {
      transition: none;
      margin-bottom: 12px;

      ${media.sm} {
        margin-bottom: 24px;
      }
    }
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.33rem;
  margin-bottom: 1rem;
`;
