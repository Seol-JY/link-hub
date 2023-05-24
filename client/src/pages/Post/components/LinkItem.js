import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LinkItem = ({ description, link }) => {
  const url = new URL(link);
  const faviconLink = `${url.protocol}//${url.hostname}/favicon.ico`;

  return (
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
  );
};

export default LinkItem;
