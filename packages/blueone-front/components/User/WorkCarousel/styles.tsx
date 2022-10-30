import { css } from '@emotion/react';

import { CARD_MARGIN_TOP } from '@components/User/WorkCard/styles';
import media from '@utils/media';

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
