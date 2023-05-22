import { useDropzone } from "react-dropzone";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import styled from "styled-components";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import AddIcon from "@mui/icons-material/Add";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";
import DropImage from "../../../assets/img/drop_image.png";
import LinkIcon from "@mui/icons-material/Link";
import NotesIcon from "@mui/icons-material/Notes";

const S = {
  Editor: styled.div`
    margin-top: 4rem;
    letter-spacing: 0;
    box-sizing: inherit;
    overflow: hidden;
    min-height: 85vh;
  `,
  Container: styled.div`
    letter-spacing: 0;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    min-height: 72vh;
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 800px;
  `,
};

const Editor = () => {
  const [preview, setPreview] = useState(DropImage);
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    const file = acceptedFiles;

    // 이미지 파일을 읽어 setImage 로 저장
    if (file) {
      reader.readAsDataURL(file[0]);
      setImage(file[0]);
    }
    // onDrop되면 preview 되게 처리하고, 기존 이미지 url정보를 공백처리한다.
    reader.onload = (e) => {
      setPreview(reader.result);
      document.getElementsByName("imageurl")[0].value = "";
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  const handleImageChange = (e) => {
    const { name, value } = e.target;

    // 이 부분을 추가
    if (e.target.name === "imageurl") {
      setPreview(e.target.value);
    }
  };

  return (
    <S.Editor>
      <S.Container>
        <Input
          color="neutral"
          size="lg"
          placeholder="제목을 입력하세요"
          required
          variant="plain"
          sx={{
            paddingLeft: "2px",
            lineHeight: "2rem",
            fontSize: "1.4rem",
            borderRadius: "0",
            height: "3.7rem",
            "--Input-focusedHighlight": "none",
          }}
        />
        <Divider orientation="horizontal" sx={{ marginBottom: "10px" }} />
        <div {...getRootProps()}>
          <img src={preview} style={{ width: "100%" }} alt="이미지" />
        </div>
        <input {...getInputProps()} multiple={false} name="imageurl" />

        <Textarea
          required
          color="neutral"
          variant="plain"
          placeholder="북마크에 대한 설명을 입력하세요"
          minRows={11}
          sx={{ marginTop: "10px", marginBottom: "20px", borderRadius: "0", "--Textarea-focusedHighlight": "none" }}
        />

        <Stack spacing={1} divider={<Divider />}>
          <div style={{ display: "flex", flexDirection: "col" }}>
            <Input
              size="lg"
              variant="plain"
              placeholder="설명"
              sx={{
                flexGrow: "1",
                marginRight: "10px",
                "--Input-focusedHighlight": "#B9B9C6",
                "--Input-focusedThickness": "0.5px",
              }}
              startDecorator={<NotesIcon fontSize="small" />}
            />
            <Input
              size="lg"
              variant="plain"
              placeholder="URI"
              sx={{ flexGrow: "10", "--Input-focusedHighlight": "#B9B9C6", "--Input-focusedThickness": "0.5px" }}
              startDecorator={<LinkIcon fontSize="small" />}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "col" }}>
            <Input
              size="lg"
              variant="plain"
              sx={{
                flexGrow: "1",
                marginRight: "10px",
                "--Input-focusedHighlight": "#B9B9C6",
                "--Input-focusedThickness": "0.5px",
              }}
              startDecorator={<NotesIcon fontSize="small" />}
            />
            <Input
              size="lg"
              variant="plain"
              sx={{ flexGrow: "10", "--Input-focusedHighlight": "#B9B9C6", "--Input-focusedThickness": "0.5px" }}
              startDecorator={<LinkIcon fontSize="small" />}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "col" }}>
            <Input
              size="lg"
              variant="plain"
              sx={{
                flexGrow: "1",
                marginRight: "10px",
                "--Input-focusedHighlight": "#B9B9C6",
                "--Input-focusedThickness": "0.5px",
              }}
              startDecorator={<NotesIcon fontSize="small" />}
            />
            <Input
              size="lg"
              variant="plain"
              sx={{ flexGrow: "10", "--Input-focusedHighlight": "#B9B9C6", "--Input-focusedThickness": "0.5px" }}
              startDecorator={<LinkIcon fontSize="small" />}
            />
          </div>
        </Stack>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "70px" }}>
          <Button color="neutral" size="sm" style={{ borderRadius: "20px" }}>
            추가
            <AddIcon fontSize="small" />
          </Button>
        </div>
      </S.Container>
    </S.Editor>
  );
};

export default Editor;
