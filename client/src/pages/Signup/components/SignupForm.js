import styled from "styled-components";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const S = {
  LoginForm: styled.div`
    margin-top: 13px;
    background-color: #fbfbfb;
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
    min-height: 650px;
    height: calc(100vh - 400px);
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
    max-height: 1000px;
  `,
  RootWrappper: styled.div`
    letter-spacing: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  `,
  AlignLeft: styled.div`
    flex-direction: column;
    width: 30%;
    display: flex;
    float: left;
  `,
  Title: styled.h2`
    text-align: left;
    color: #393a43;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 1rem;
  `,
  Description: styled.p`
    text-align: left;
    color: #393a43;
    margin-bottom: 1.8rem;
    line-height: 1.5;
  `,
};

const SignupForm = () => {
  return (
    <S.LoginForm>
      <S.Container>
        <S.RootWrappper>
          <S.AlignLeft>
            <S.Title>회원가입</S.Title>
            <S.Description>
              LinkHub 홈페이지에 오신것을 환영합니다!
              <br />
              회원가입하여 LinkHub의 모든 기능을 사용해보세요.
            </S.Description>
          </S.AlignLeft>
          <Input
            style={{ width: "30%", marginBottom: "0.8rem" }}
            size="lg"
            placeholder="이메일"
            required
            variant="outlined"
          />
          <Input
            style={{ width: "30%", marginBottom: "1.8rem" }}
            size="lg"
            placeholder="닉네임"
            required
            variant="outlined"
          />
          <Input
            style={{ width: "30%", marginBottom: "0.8rem" }}
            size="lg"
            placeholder="비밀번호"
            required
            variant="outlined"
          />
          <Input
            style={{ width: "30%", marginBottom: "1.8rem" }}
            size="lg"
            placeholder="비밀번호 확인"
            required
            variant="outlined"
          />
          <Button size="lg" style={{ width: "30%", marginBottom: "1rem" }}>
            가입하기
          </Button>
          <p style={{ fontSize: "0.9rem" }}>개인정보는 안전하게 관리됩니다.</p>
        </S.RootWrappper>
      </S.Container>
    </S.LoginForm>
  );
};

export default SignupForm;
