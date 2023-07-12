import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import InputForm from "./components/InputForm";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import ContentItem from "../../components/ContentItem";

const S = {
  Search: styled.div`
    margin-top: 4rem;
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
    min-height: 72vh;
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 800px;
  `,
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const [resData, setResData] = useState(null);

  useEffect(() => {
    // 검색 키워드를 바탕으로 검색 수행
    if (q !== "" && q !== null)
      axios
        .get(`${process.env.REACT_APP_API_HOST}api/search/?q=${q}`)
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [q]);

  return (
    <S.Search>
      <S.Container>
        <InputForm resData={resData} />
        <Stack spacing={0.3} divider={<Divider />}>
          {/* 검색 결과를 게시글 아이템으로 출력 */}
          {resData && resData.map((RD) => <ContentItem key={RD.bookmarkId} data={RD} />)}
        </Stack>
      </S.Container>
    </S.Search>
  );
};

export default Search;
