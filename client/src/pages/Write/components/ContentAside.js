// 북마크 게시글 작성 화면 아래의 작성취소 및 완료 화면
import styled from "styled-components";
import Button from "@mui/joy/Button/Button";
import { useNavigate } from "react-router-dom";

const S = {
  ContentAside: styled.div`
    font-size: 13px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    outline: none;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    background-color: #fbfbfb;
    z-index: 1;
    overflow: hidden;
    position: sticky;
  `,
  Container: styled.div`
    letter-spacing: 0px;
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-height: 64px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
    justify-content: space-between;
  `,
};

const ContentAside = ({ setDoSubmit }) => {
  const navigate = useNavigate();
  return (
    <S.ContentAside>
      <S.Container>
        <Button
          variant="outlined"
          color="neutral"
          sx={{ borderRadius: "20px" }}
          startDecorator={"  "}
          endDecorator={"  "}
          onClick={() => {
            navigate("/");
          }}
        >
          작성 취소
        </Button>
        <Button
          color="neutral"
          sx={{ borderRadius: "20px" }}
          startDecorator={"  "}
          endDecorator={"  "}
          onClick={() => {
            setDoSubmit(true);
          }}
        >
          작성 완료
        </Button>
      </S.Container>
    </S.ContentAside>
  );
};

export default ContentAside;
