import styled from "styled-components";
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
  return (
    <S.Search>
      <S.Container>
        <InputForm />
        <Stack spacing={0.3} divider={<Divider />}>
          <ContentItem />
          <ContentItem />
        </Stack>
      </S.Container>
    </S.Search>
  );
};

export default Search;
