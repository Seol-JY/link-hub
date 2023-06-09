import { useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import styled from "styled-components";
import Divider from "@mui/joy/Divider";
import LinkItem from "./LinkItem";
import useRelativeTime from "../../../hooks/useRelativeTime";

const S = {
  Editor: styled.div`
    margin-top: 4rem;
    letter-spacing: 0;
    box-sizing: inherit;
    overflow: hidden;
    min-height: 85vh;
  `,
  Container: styled.div`
    letter-spacing: 0;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    min-height: 72vh;
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 800px;
  `,
};

const View = ({ resData }) => {
  const relativeTime = useRelativeTime(resData.data.created_at);
  const navigate = useNavigate();

  return (
    <S.Editor>
      <S.Container>
        <Typography
          level="h1"
          sx={{
            fontWeight: 800,
            fontSize: "2.7rem",
            letterSpacing: "-0.1rem",
            wordBreak: "keep-all",
            marginBottom: "32px",
          }}
        >
          {resData.data.title}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            level="body1"
            sx={{ paddingLeft: "0.4rem" }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/@${resData.data.username}`);
            }}
          >
            <b style={{ fontWeight: "600" }}>{resData.data.username}</b> · {relativeTime}
          </Typography>

          <Typography level="body1" sx={{ paddingLeft: "0.4rem" }}>
            조회수 {resData.data.view_count}회
          </Typography>
        </div>
        {resData.data.img && (
          <img
            src={`data:image/jpeg;base64,${resData.data.img}`} // 이미지 데이터를 base64 형식으로 지정
            alt="Post Image"
            style={{ width: "100%", marginTop: "32px" }}
          />
        )}
        <Typography level="h6" sx={{ paddingLeft: "0.4rem", marginTop: "3rem" }}>
          {resData.data.description}
        </Typography>
        <Divider sx={{ marginTop: "150px" }}>링크 목록</Divider>
        <Stack spacing={2.7} sx={{ margin: "30px 0 150px", minHeight: "10rem" }}>
          {resData.data.links.map((item, i) => (
            <LinkItem key={i} description={item.linkDescription} link={item.link} />
          ))}
        </Stack>
      </S.Container>
    </S.Editor>
  );
};

export default View;
