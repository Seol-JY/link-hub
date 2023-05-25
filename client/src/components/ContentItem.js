import { styled } from "styled-components";
import AspectRatio from "@mui/joy/AspectRatio";
import DropImage from "../assets/img/잡코.png";
import Typography from "@mui/joy/Typography";

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
    <S.Wrapper>
      <AspectRatio objectFit="cover">
        <img src={DropImage} alt="exp" />
      </AspectRatio>
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
      >
        dfs
      </Typography>
    </S.Wrapper>
  );
};

export default contentItem;
