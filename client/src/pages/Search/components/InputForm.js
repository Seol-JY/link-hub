import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import ClearIcon from "@mui/icons-material/Clear";

const S = {
  Description: styled.p`
    -webkit-font-smoothing: antialiased;
    box-sizing: inherit;
    margin-bottom: 4rem;
    font-size: 1.125rem;
    line-height: 1.5;
    padding-left: 2px;
  `,
};

const InputForm = () => {
  return (
    <>
      <Input
        color="neutral"
        size="lg"
        placeholder="검색어를 입력하세요"
        startDecorator={<SearchIcon sx={{ fontSize: "1.7rem" }} />}
        endDecorator={<ClearIcon sx={{ fontSize: "1rem" }} />}
        sx={{
          lineHeight: "2rem",
          fontSize: "1.4rem",
          marginBottom: "24px",
          borderRadius: "8px",
          height: "3.7rem",
        }}
      />
      <S.Description>
        총 <b style={{ fontWeight: "600" }}>321개</b>의 북마크를 찾았어요.
      </S.Description>
    </>
  );
};

export default InputForm;
