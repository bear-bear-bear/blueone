import { Card, Empty } from 'antd';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import media from '@utils/media';

const CARD_MARGIN_TOP = '2rem';
export const globalCSS = css`
  .ant-card-actions {
    li {
      margin: 0 !important;
    }
  }

  .ant-card-body {
    padding: 24px 12px;

    ${media.sm} {
      padding: 24px;
    }
  }

  .ant-carousel {
    position: relative;
    top: calc(50% - ${CARD_MARGIN_TOP});
    transform: translateY(-50%);

    .slick-slide > div {
      padding: 0 3px;
    }

    .carousel-custom-dot {
      li {
        button {
          background: #141414 !important;
        }
      }

      li.slick-active {
        button {
          background: #141414 !important;
        }
      }
    }
  }
`;

export const StyledCard = styled(Card)`
  max-height: 70vh;
  overflow-y: auto;
  margin-top: ${CARD_MARGIN_TOP};
  border: none;
`;

export const StyledEmpty = styled(Empty)`
  position: relative;
  top: 42%;
  transform: translateY(-50%);
  color: #fafafa;
`;

export const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.66rem;
  margin-top: 1.66rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 0.66rem;
  font-size: 16px;

  p:first-of-type {
    width: fit-content;
    min-width: 4rem;
    text-align: right;
  }

  p:last-of-type {
    word-break: break-all;
  }
`;
