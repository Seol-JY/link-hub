// Footer 구성
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";

const S = {
  Footer: styled.footer`
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    letter-spacing: 0;
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-top: 10px;
    margin-right: auto;
    display: block;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
  `,
  Container: styled.div`
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    letter-spacing: 0;
    box-sizing: inherit;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
  `,
  Hr: styled.hr`
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    letter-spacing: 0;
    box-sizing: inherit;
    margin: 0;
    flex-shrink: 0;
    border-width: 0;
    border-style: solid;
    border-bottom-width: thin;
    border-color: #f1f3f5;
  `,
  P: styled.p`
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    letter-spacing: 0;
  `,
};

const Footer = () => {
  const location = useLocation();
  const [isWriteMode, setIsWriteMode] = useState(false);

  useEffect(() => {
    if (location.pathname === "/write") {
      setIsWriteMode(true);
    } else {
      setIsWriteMode(false);
    }
  }, [location]);

  return isWriteMode ? (
    ""
  ) : (
    <S.Footer>
      <S.Hr />
      <S.Container>
        <S.P>Copyright © 2023 SeolJY All rights reserved.</S.P>
        <S.P>
          <GitHubIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open("https://github.com/Seol-JY/link-hub", "_blank");
            }}
          />
        </S.P>
      </S.Container>
    </S.Footer>
  );
};

export default Footer;
