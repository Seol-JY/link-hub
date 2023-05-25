import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import styled from "styled-components";
import Divider from "@mui/joy/Divider";
import { useState } from "react";
import DropImage from "../../../assets/img/잡코.png";
import LinkItem from "./LinkItem";

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

const View = () => {
  const [preview, setPreview] = useState(DropImage);

  const nameList = ["네이버", "잡코리아", "링크드인 아는사람찾기"];
  const linkList = [
    "https://www.naer.com/sdfsdfdsfsdf",
    "https://www.jobkorea.co.kr/",
    "https://www.linkedin.com/pub/dir/+/+?trk=guest_homepage-basic_guest_nav_menu_people",
  ];

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
          취업 준비 사이트 모음
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography level="body1" sx={{ paddingLeft: "0.4rem" }}>
            <b style={{ fontWeight: "600" }}>seoljy</b> · 하루 전
          </Typography>

          <Typography level="body1" sx={{ paddingLeft: "0.4rem" }}>
            조회수 1.2천회
          </Typography>
        </div>

        <img src={preview} style={{ width: "100%", marginTop: "32px" }} alt="이미지" />

        <Typography level="h6" sx={{ paddingLeft: "0.4rem", marginTop: "3rem" }}>
          제가 취업 준비할때 유용하게 썼던 사이트들을 정리해봤어요!
        </Typography>

        <Divider sx={{ marginTop: "150px" }}>링크 목록</Divider>

        <Stack spacing={2.7} sx={{ margin: "30px 0 150px", minHeight: "10rem" }}>
          {linkList.map((item, i) => (
            <LinkItem key={i} description={nameList[i]} link={item} />
          ))}
        </Stack>
      </S.Container>
    </S.Editor>
  );
};

export default View;
