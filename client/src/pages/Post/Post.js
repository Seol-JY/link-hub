// 게시글 본문 컴포넌트
import View from "./components/View";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { user, postId } = useParams();
  const [loadStatus, setLoadStatus] = useState("before");
  const [resData, setResData] = useState(null);

  const formattedUser = user.startsWith("@") ? user.slice(1) : null;

  useEffect(() => {
    // 사용자 이름과 bookmarkId를 통해서 내용 불러옴
    if (formattedUser !== null) {
      axios
        .get(`http://${process.env.REACT_APP_API_HOST}/api/post/?username=${formattedUser}&bookmarkId=${postId}`)
        .then((res) => {
          setLoadStatus("loaded");
          setResData(res);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setLoadStatus("err");
          } else {
            setLoadStatus("err");
            console.log(err);
          }
        });
    } else {
      setLoadStatus("err");
    }
  }, []);

  return loadStatus === "loaded" ? <View resData={resData} /> : loadStatus === "error" ? <div>404</div> : "";
};
export default Post;
