// 북마크 게시글 작성 화면
import { useState } from "react";
import ContentAside from "./components/ContentAside";
import Editor from "./components/Editor";

const Write = () => {
  const [doSubmit, setDoSubmit] = useState(false);
  return (
    <>
      <Editor doSubmit={doSubmit} setDoSubmit={setDoSubmit} />
      <ContentAside setDoSubmit={setDoSubmit} />
    </>
  );
};

export default Write;
