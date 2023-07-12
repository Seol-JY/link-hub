import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import FormHelperText from "@mui/joy/FormHelperText";

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
    min-width: "30%";
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState("");

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {
    // 회원가입 요청 및 유효성 체크 로직
    if (email !== "" && username !== "" && password !== "" && passwordConfirm !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        setEmailErr("이메일 형식이 아닙니다");
        return;
      }

      if (password !== passwordConfirm) {
        setPasswordConfirmErr("입력한 비밀번호가 서로 일치하지 않습니다");
        return;
      }

      axios
        .post(`${process.env.REACT_APP_API_HOST}/api/register`, { email, username, password })
        .then((res) => {
          if (res.data.success) {
            setIsRegisterSuccess(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            const errMsg = err.response.data.message;
            if (errMsg === "duplicate username") {
              setUsernameErr("중복된 닉네임입니다");
            } else if (errMsg === "duplicate email") {
              setEmailErr("중복된 이메일입니다");
            }
          } else {
            console.log(err);
          }
        });
    }
  };
  return (
    <S.LoginForm>
      <S.Container>
        <S.RootWrappper>
          {isRegisterSuccess ? (
            <>
              <S.Title>환영합니다!</S.Title>
              <S.Description style={{ textAlign: "center" }}>
                회원가입이 완료되었습니다.
                <br />
                LinkHub의 모든 기능을 사용해보세요.
              </S.Description>
              <Button
                size="lg"
                style={{ minWidth: "21%", marginBottom: "1rem" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                홈페이지로 돌아가기
              </Button>
            </>
          ) : (
            <>
              <S.AlignLeft>
                <S.Title>회원가입</S.Title>
                <S.Description>
                  LinkHub 홈페이지에 오신것을 환영합니다!
                  <br />
                  회원가입하여 LinkHub의 모든 기능을 사용해보세요.
                </S.Description>
              </S.AlignLeft>
              <Input
                style={{ minWidth: "30%" }}
                size="lg"
                placeholder="이메일"
                required
                variant="outlined"
                value={email}
                error={emailErr !== ""}
                onChange={(e) => {
                  setEmailErr("");
                  setEmail(e.currentTarget.value);
                }}
              />
              {emailErr ? (
                <FormHelperText
                  style={{ color: "#d3232f", marginLeft: "3px", marginTop: "5px", float: "left", minWidth: "30%" }}
                >
                  <p style={{ textAlign: "left", marginRight: "auto" }}>{emailErr}</p>
                </FormHelperText>
              ) : (
                ""
              )}
              <Input
                style={{ minWidth: "30%", marginTop: "0.8rem" }}
                size="lg"
                placeholder="닉네임"
                required
                variant="outlined"
                value={username}
                error={usernameErr !== ""}
                onChange={(e) => {
                  setUsernameErr("");
                  setUsername(e.currentTarget.value);
                }}
              />
              {usernameErr ? (
                <FormHelperText
                  style={{ color: "#d3232f", marginLeft: "3px", marginTop: "5px", float: "left", minWidth: "30%" }}
                >
                  <p style={{ textAlign: "left", marginRight: "auto" }}>{usernameErr}</p>
                </FormHelperText>
              ) : (
                ""
              )}
              <Input
                style={{ minWidth: "30%", marginTop: "1.8rem" }}
                size="lg"
                placeholder="비밀번호"
                required
                variant="outlined"
                value={password}
                error={passwordErr !== ""}
                type="password"
                onChange={(e) => {
                  setPasswordErr("");
                  setPassword(e.currentTarget.value);
                }}
              />
              {passwordErr ? (
                <FormHelperText
                  style={{ color: "#d3232f", marginLeft: "3px", marginTop: "5px", float: "left", minWidth: "30%" }}
                >
                  <p style={{ textAlign: "left", marginRight: "auto" }}>{passwordErr}</p>
                </FormHelperText>
              ) : (
                ""
              )}
              <Input
                style={{ minWidth: "30%", marginTop: "0.8rem" }}
                size="lg"
                placeholder="비밀번호 확인"
                required
                variant="outlined"
                value={passwordConfirm}
                error={passwordConfirmErr !== ""}
                type="password"
                onChange={(e) => {
                  setPasswordConfirmErr("");
                  setPasswordConfirm(e.currentTarget.value);
                }}
              />
              {passwordConfirmErr ? (
                <FormHelperText
                  style={{ color: "#d3232f", marginLeft: "3px", marginTop: "5px", float: "left", minWidth: "30%" }}
                >
                  <p style={{ textAlign: "left", marginRight: "auto" }}>{passwordConfirmErr}</p>
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                size="lg"
                style={{ minWidth: "30%", marginTop: "1.8rem", marginBottom: "1rem" }}
                onClick={onSubmit}
              >
                가입하기
              </Button>
              <p style={{ fontSize: "0.9rem" }}>개인정보는 안전하게 관리됩니다.</p>
            </>
          )}
        </S.RootWrappper>
      </S.Container>
    </S.LoginForm>
  );
};

export default SignupForm;
