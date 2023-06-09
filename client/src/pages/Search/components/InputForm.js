import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import ClearIcon from "@mui/icons-material/Clear";

const S = {
  Description: styled.p`
    -webkit-font-smoothing: antialiased;
    box-sizing: inherit;
    margin-bottom: 0.2rem;
    font-size: 1.125rem;
    line-height: 1.5;
    padding-left: 2px;
  `,
};

const InputForm = ({ resData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [input, setInput] = useState("");
  const [description, setDescription] = useState(false);

  const navigateForSearch = () => {
    navigate(`/search?q=${input}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${input}`);
      navigateForSearch();
    }
  };

  useEffect(() => {
    const query = queryString.parse(searchParams.toString());
    if (query.q !== undefined) {
      setInput(query.q);
      if (query.q !== "") {
        setDescription(true);
      } else {
        setDescription(false);
      }
    }
  }, [searchParams]);

  return (
    <>
      <Input
        color="neutral"
        size="lg"
        placeholder="검색어를 입력하세요"
        startDecorator={<SearchIcon sx={{ fontSize: "1.7rem", cursor: "pointer" }} onClick={navigateForSearch} />}
        endDecorator={
          input !== "" ? (
            <ClearIcon
              sx={{ fontSize: "1rem", cursor: "pointer" }}
              onClick={() => {
                setInput("");
              }}
            />
          ) : (
            ""
          )
        }
        required
        sx={{
          lineHeight: "2rem",
          fontSize: "1.4rem",
          marginBottom: "24px",
          borderRadius: "8px",
          height: "3.7rem",
          "--Input-focusedHighlight": "#B9B9C6",
          "--Input-focusedThickness": "1px",
        }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {description && resData ? (
        <S.Description>
          총 <b style={{ fontWeight: "600" }}>{resData.length}개</b>의 북마크를 찾았어요.
        </S.Description>
      ) : (
        ""
      )}
    </>
  );
};

export default InputForm;
