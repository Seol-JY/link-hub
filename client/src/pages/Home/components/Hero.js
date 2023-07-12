import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ReactComponent as HeroImg } from "../../../assets/svg/Hero.svg";
import axios from "axios";

const S = {
  Hero: styled.div`
    letter-spacing: 0;
    box-sizing: inherit;
    overflow: hidden;
  `,
  Container: styled.div`
    letter-spacing: 0;
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
    min-height: 500px;
    height: calc(100vh - 160px);
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1250px;
    max-height: 1000px;
  `,
  RootWrappper: styled.div`
    letter-spacing: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: left;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    float: left;
  `,
  Wrapper: styled.div`
    letter-spacing: 0;
    box-sizing: border-box;
    flex-direction: row;
    margin: auto;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 50%;
  `,
  IntroLayout: styled.div`
    letter-spacing: 0px;
    box-sizing: inherit;
    text-align: left;
  `,
  H1: styled.h1`
    text-align: left;
    box-sizing: inherit;
    margin: 0;
    font-weight: 800;
    font-size: 3.7rem;
    line-height: 1.2;
    color: #0a1929;
    margin-bottom: 20px;
    max-width: 500px;
  `,
  Highlight: styled.span`
    color: rgb(14, 81, 214);
  `,
  Description: styled.p`
    letter-spacing: 0;
    color: #3e5060;
    margin-bottom: 30px;
    max-width: 500px;
    line-height: 1.25rem;
  `,
};

const Hero = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/validate`, {
        withCredentials: true, // 쿠키 전달을 위한 옵션 설정
      })
      .then((res) => {
        if (res.data.success) {
          setIsLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <S.Hero>
      <S.Container>
        <S.RootWrappper>
          <S.Wrapper>
            <S.IntroLayout>
              <S.H1>
                <span style={{ display: "block" }}>세상 간단한</span> 북마크 공유 서비스.{" "}
                <S.Highlight>LinkHub</S.Highlight>
              </S.H1>
              <S.Description style={{ marginBottom: "0" }}>
                당신의 북마크를 공유하고 세상과 함께 나누어 보세요! 다양한 주제와
                <span style={{ display: "block" }}>관련된 북마크를 찾고 경험을 나누세요.</span>
              </S.Description>

              {isLogin ? (
                ""
              ) : (
                <>
                  <Button
                    sx={{ marginTop: "30px" }}
                    size="lg"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    7초만에 시작하기
                    <KeyboardArrowRightIcon style={{ marginLeft: "6px" }} />
                  </Button>
                  <S.Description style={{ marginTop: "15px", marginBottom: "0" }}>
                    계정이 있나요?{" "}
                    <Link
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      로그인하기
                    </Link>
                  </S.Description>
                </>
              )}
            </S.IntroLayout>
          </S.Wrapper>
          <S.Wrapper>
            <HeroImg style={{ width: "100%" }} />
          </S.Wrapper>
        </S.RootWrappper>
      </S.Container>
    </S.Hero>
  );
};

export default Hero;
