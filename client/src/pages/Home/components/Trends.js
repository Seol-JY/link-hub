import styled from "styled-components";
import { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MinContentItem from "../../../components/MinContentItem";

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
    padding: 4rem 0 4rem 0;
    letter-spacing: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: left;
    height: 100%;
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
  const [opt, setOpt] = useState("trend");

  const [resData, setResData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${opt}/?limit=3`)
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
          <S.Title> 요즘 뜨는 북마크 🔥</S.Title>
          <div>
            <Button
              variant={opt === "trend" ? "solid" : "outlined"}
              color="neutral"
              style={{ marginRight: "8px", borderRadius: "20px" }}
              onClick={() => {
                setOpt("trend");
              }}
            >
              인기 순
            </Button>
            <Button
              variant={opt === "recent" ? "solid" : "outlined"}
              color="neutral"
              style={{ marginRight: "4px", borderRadius: "20px" }}
              onClick={() => {
                setOpt("recent");
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

          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button
              variant="outlined"
              color="neutral"
              style={{ marginRight: "4px", borderRadius: "20px" }}
              onClick={() => {
                navigate("/trend");
              }}
            >
              더보기
              <AddIcon color="disabled" />
            </Button>
          </div>
        </S.RootWrappper>
      </S.Container>
    </S.Trends>
  );
};

export default Trends;
