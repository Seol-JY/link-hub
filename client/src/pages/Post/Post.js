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
    if (formattedUser !== null) {
      axios
        .get(`http://localhost:8080/api/post/?username=${formattedUser}&bookmarkId=${postId}`)
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
