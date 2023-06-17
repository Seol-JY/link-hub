// 게시글의 link 요소
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useEffect } from "react";

const LinkItem = ({ description, link }) => {
  const [willRender, setWillRender] = useState(false);

  const [url, setUrl] = useState("");
  const [faviconLink, setFaviconLink] = useState("");

  useEffect(() => {
    // 링크 정보를 바탕으로 favicon 추출 및 세팅
    try {
      setUrl(new URL(link));
      setFaviconLink(`${url.protocol}//${url.hostname}/favicon.ico`);
      setWillRender(true);
    } catch (e) {
      setWillRender(false);
    }
  }, [faviconLink]);

  return willRender ? (
    <div style={{ display: "flex", minHeight: "3.7rem" }}>
      <Button
        size="lg"
        variant="plain"
        color="neutral"
        sx={{
          justifyContent: "flex-start",
          boxShadow: " 0px 1px 0px rgba(17, 17, 26, 0.1)",
          flexGrow: "1",
          flexDirection: "row",
          overflow: "hidden ",
        }}
        startDecorator={<Avatar alt="?" sx={{ "--Avatar-size": "22px" }} src={faviconLink} />}
        endDecorator={
          <div
            style={{
              fontSize: "0.7rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "darkgray",
              maxWidth: "300px",
            }}
          >
            {link}
          </div>
        }
        onClick={() => {
          window.open(link, "_blank");
        }}
      >
        <span>{description}</span>
      </Button>

      <CopyToClipboard text={link}>
        <Tooltip title="복사하기" arrow placement="right">
          <Button
            size="lg"
            color="neutral"
            variant="plain"
            sx={{
              marginLeft: "10px",
              boxShadow: " 0px 1px 0px rgba(17, 17, 26, 0.1)",
            }}
          >
            <ContentCopyIcon sx={{ fontSize: "medium" }} />
          </Button>
        </Tooltip>
      </CopyToClipboard>
    </div>
  ) : (
    ""
  );
};

export default LinkItem;
