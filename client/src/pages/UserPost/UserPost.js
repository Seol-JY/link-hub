// 특정 사용자 게시글 목록 조회
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import ContentItem from "../../components/ContentItem";

const S = {
  UserPost: styled.div`
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

const UserPost = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const formattedUser = user.startsWith("@") ? user.slice(1) : null;

  const [resData, setResData] = useState(null);

  useEffect(() => {
    if (formattedUser !== null) {
      axios
        .get(`http://${process.env.REACT_APP_API_HOST}/api/search/user/?q=${formattedUser}`)
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/");
    }
  }, [formattedUser]);

  return (
    <S.UserPost>
      <S.Container>
        <Stack spacing={0.3} divider={<Divider />}>
          {resData && resData.map((RD) => <ContentItem key={RD.bookmarkId} data={RD} />)}
        </Stack>
      </S.Container>
    </S.UserPost>
  );
};

export default UserPost;
