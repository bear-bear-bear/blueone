import { css } from '@emotion/react';
import media from '@utils/media';

const globalCSS = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  body > div:first-of-type,
  div#__next,
  div#__next > div {
    min-height: 100vh;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    ${media.xs},
    ${media.sm},
    ${media.md},
    ${media.lg} {
      font-size: 15px;
    }
    ${media.xl},
    ${media.xxl} {
      font-size: 16px;
    }
  }
`;

export default globalCSS;
