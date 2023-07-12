import styled from "styled-components";
import Button from "@mui/joy/Button";
import { useState, useEffect } from "react";
import MinContentItem from "../../../components/MinContentItem";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const S = {
  Trends: styled.div`
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
    min-height: 600px;
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
  `,
  RootWrappper: styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: left;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  `,

  Title: styled.h2`
    text-align: left;
    box-sizing: inherit;
    margin: 0;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1.2;
    color: #0a1929;
    margin-top: 17px;
    margin-bottom: 20px;
    max-width: 500px;
  `,
};

const Trends = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const opt = location.pathname.split("/").pop(); // URL에서 추출

  const [resData, setResData] = useState(null);

  useEffect(() => {
    // recent 및 trend에 따라 적절한 추천 게시물을 요청
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/${opt}`)
      .then((res) => {
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [opt]);

  return (
    <S.Trends>
      <S.Container>
        <S.RootWrappper>
          <div style={{ marginTop: "3rem " }}>
            <Button
              variant={opt === "trend" ? "solid" : "outlined"}
              color="neutral"
              style={{ marginRight: "8px", borderRadius: "20px" }}
              onClick={() => {
                navigate("/trend");
              }}
            >
              인기 순
            </Button>
            <Button
              variant={opt === "recent" ? "solid" : "outlined"}
              color="neutral"
              style={{ marginRight: "4px", borderRadius: "20px" }}
              onClick={() => {
                navigate("/recent");
              }}
            >
              최신 순
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "15px",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            {resData && resData.map((RD) => <MinContentItem key={RD.bookmarkId} data={RD} />)}
          </div>
        </S.RootWrappper>
      </S.Container>
    </S.Trends>
  );
};

export default Trends;
