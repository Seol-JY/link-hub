import { styled } from "styled-components";
import AspectRatio from "@mui/joy/AspectRatio";
import DropImage from "../assets/img/잡코.png";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";

const S = {
  Wrapper: styled.div`
    box-sizing: inherit;
    padding-top: 4rem;
    padding-bottom: 4rem;
    line-height: 1.5;
    border-top: 1px solid var(--border4);
  `,
};

const contentItem = () => {
  return (
    <S.Wrapper style={{ cursor: "pointer" }} onClick={() => {}}>
      <AspectRatio objectFit="cover">
        <img src={DropImage} alt="exp" />
      </AspectRatio>
      <Stack spacing={1.2} sx={{ marginTop: "20px" }}>
        <Typography
          level="h3"
          sx={{
            fontWeight: "700",
          }}
        >
          취업 준비 사이트 모음
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
          }}
        >
          제가 취업할때 참고했던 사이트들이에요~!!
        </Typography>
        <div style={{ marginTop: "1.5rem" }}>
          <Chip color="primary" sx={{ marginRight: "7px" }} variant="soft">
            네이버
          </Chip>
          <Chip color="primary" sx={{ marginRight: "7px" }} variant="soft">
            잡코리아
          </Chip>
          <Chip color="primary" sx={{ marginRight: "7px" }} variant="soft">
            링크드인 아는사람
          </Chip>
        </div>
        <Typography level="body1">
          <b style={{ fontWeight: "600" }}>seoljy</b> · 하루 전
        </Typography>
      </Stack>
    </S.Wrapper>
  );
};

export default contentItem;
