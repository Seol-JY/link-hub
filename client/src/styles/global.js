import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  *, *::before, *::after {
    box-sizing: border-box;
		font-family: 'AppleSDGothicNeo', 'Noto Sans KR' !important;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }
  body {
    overflow: overlay;
  }
`;

export default GlobalStyle;
