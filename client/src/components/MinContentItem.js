// 북마크 게시글 아이템 - 소형 버전
import Card from "@mui/joy/Card";
import { useNavigate } from "react-router";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import useRelativeTime from "../hooks/useRelativeTime";

const MinContentItem = ({ data }) => {
  const navigate = useNavigate();
  const relativeTime = useRelativeTime(data.created_at);
  return (
    <Card
      variant="outlined"
      sx={{ margin: "0.6rem", width: "31.3%", cursor: "pointer" }}
      onClick={() => {
        navigate(`/@${data.username}/${data.bookmarkId}`);
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={`data:image/jpeg;base64,${data.img}`} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
        {data.title}
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        {data.description}
      </Typography>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
        }}
      >
        <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
          조회수 {data.view_count}회
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
          {relativeTime}
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default MinContentItem;
