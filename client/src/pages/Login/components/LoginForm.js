import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import axios from "axios";
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
  Title: styled.h2`
    color: #393a43;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 1rem;
  `,
  Description: styled.p`
    text-align: center;
    color: #393a43;
    margin-bottom: 1.8rem;
    line-height: 1.5;
  `,
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/validate`, {
        withCredentials: true, // 쿠키 전달을 위한 옵션 설정
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = () => {
    // 로그인 요청 전송
    if (email !== "" && password !== "") {
      axios
        .post(`http://localhost:8080/api/login`, { email, password }, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErr("아이디 또는 비밀번호가 일치하지 않습니다");
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
          <S.Title>Member Login</S.Title>
          <S.Description>
            LinkHub 홈페이지에 오신것을 환영합니다!
            <br />
            로그인하여 LinkHub의 모든 기능을 사용해보세요.
          </S.Description>
          <Input
            style={{ width: "30%", marginBottom: "0.8rem" }}
            size="lg"
            placeholder="이메일"
            required
            variant="outlined"
            value={email}
            onChange={(e) => {
              setErr("");
              setEmail(e.currentTarget.value);
            }}
          />
          <Input
            style={{ width: "30%", marginBottom: "1.8rem" }}
            size="lg"
            placeholder="비밀번호"
            required
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setErr("");
              setPassword(e.currentTarget.value);
            }}
          />
          <Button size="lg" style={{ width: "30%" }} onClick={onSubmit}>
            로그인
          </Button>
          {err ? (
            <FormHelperText style={{ color: "#d3232f", marginLeft: "3px", marginTop: "10px" }}>
              <p>{err}</p>
            </FormHelperText>
          ) : (
            ""
          )}
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            계정이 없으신가요?{"  "}
            <Link style={{ fontSize: "0.9rem" }} component={RouterLink} to="/signup">
              가입하기
            </Link>
          </p>
        </S.RootWrappper>
      </S.Container>
    </S.LoginForm>
  );
};

export default LoginForm;
