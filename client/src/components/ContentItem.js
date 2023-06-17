// 북마크 게시글 아이템 - 일반
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import useRelativeTime from "../hooks/useRelativeTime";

const S = {
  Wrapper: styled.div`
    box-sizing: inherit;
    padding-top: 4rem;
    padding-bottom: 4rem;
    line-height: 1.5;
    border-top: 1px solid var(--border4);
  `,
};

const ContentItem = ({ data }) => {
  const navigate = useNavigate();
  const relativeTime = useRelativeTime(data.created_at);

  return (
    <S.Wrapper>
      <AspectRatio
        objectFit="cover"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/@${data.username}/${data.bookmarkId}`);
        }}
      >
        <img src={`data:image/jpeg;base64,${data.img}`} alt="exp" />
      </AspectRatio>
      <Stack spacing={1.2} sx={{ marginTop: "20px" }}>
        <Typography
          level="h3"
          sx={{
            fontWeight: "700",
          }}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/@${data.username}/${data.bookmarkId}`);
          }}
        >
          {data.title}
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: "#495057",
            fontWeight: "500",
          }}
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/@${data.username}/${data.bookmarkId}`);
          }}
        >
          {data.description}
        </Typography>
        <div style={{ marginTop: "1.5rem" }}>
          {data.links.map((item, index) => (
            <Chip key={index} color="primary" sx={{ marginRight: "7px" }} variant="soft">
              {item}
            </Chip>
          ))}
        </div>
        <Typography
          level="body1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/@${data.username}`);
          }}
        >
          <b style={{ fontWeight: "600" }}>{data.username}</b> · {relativeTime}
        </Typography>
      </Stack>
    </S.Wrapper>
  );
};

export default ContentItem;
