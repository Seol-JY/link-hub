// 북마크 게시글 작성 화면
import { useDropzone } from "react-dropzone";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import styled from "styled-components";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import AddIcon from "@mui/icons-material/Add";
import Textarea from "@mui/joy/Textarea";
import { useState, useEffect } from "react";
import DropImage from "../../../assets/img/drop_image.png";
import LinkIcon from "@mui/icons-material/Link";
import NotesIcon from "@mui/icons-material/Notes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
const Editor = ({ doSubmit, setDoSubmit }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(DropImage);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  // 링크 요소 data
  const [items, setItems] = useState([
    {
      description: "", // 첫 번째 아이템에만 placeholder 적용
      uri: "",
    },
    {
      description: "",
      uri: "",
    },
  ]);

  const onDrop = (acceptedFiles) => {
    // 사진 첨부시 발동
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

  const handleAddItem = () => {
    // 새로운 아이템 생성
    const newItem = {
      description: "",
      uri: "",
    };

    // 아이템 배열에 새로운 아이템 추가
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleInputChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index][field] = value;
      return updatedItems;
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    // 이미지 추가
    if (image) {
      formData.append("image", image);
    }

    // 데이터 추가
    const data = {
      title,
      description,
      link: items.map((item) => ({
        description: item.description,
        url: item.uri,
      })),
    };

    formData.append("data", JSON.stringify(data));

    axios
      .post("http://localhost:8080/api/post", formData, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (doSubmit) {
      handleSubmit();
      setDoSubmit(false);
    }
  }, [doSubmit]);

  return (
    <S.Editor>
      <S.Container>
        <Input
          name="title"
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
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <Divider orientation="horizontal" sx={{ marginBottom: "10px" }} />
        <div {...getRootProps()}>
          <img src={preview} style={{ width: "100%" }} alt="이미지" />
        </div>
        <input {...getInputProps()} multiple={false} name="imageurl" />

        <Textarea
          name="description"
          required
          color="neutral"
          variant="plain"
          placeholder="북마크에 대한 설명을 입력하세요"
          minRows={11}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
          sx={{ marginTop: "10px", marginBottom: "20px", borderRadius: "0", "--Textarea-focusedHighlight": "none" }}
        />

        <Stack spacing={1} divider={<Divider />}>
          {items.map((item, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "col" }}>
              <Input
                size="lg"
                variant="plain"
                placeholder={index === 0 ? "설명" : ""}
                sx={{
                  flexGrow: "1",
                  marginRight: "10px",
                  "--Input-focusedHighlight": "#B9B9C6",
                  "--Input-focusedThickness": "0.5px",
                }}
                startDecorator={<NotesIcon fontSize="small" />}
                value={item.description}
                onChange={(e) => handleInputChange(index, "description", e.target.value)}
              />
              <Input
                size="lg"
                variant="plain"
                placeholder="URI"
                sx={{ flexGrow: "10", "--Input-focusedHighlight": "#B9B9C6", "--Input-focusedThickness": "0.5px" }}
                startDecorator={<LinkIcon fontSize="small" />}
                value={item.uri}
                onChange={(e) => handleInputChange(index, "uri", e.target.value)}
              />
            </div>
          ))}
        </Stack>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "70px" }}>
          <Button color="neutral" size="sm" style={{ borderRadius: "20px" }} onClick={handleAddItem}>
            추가
            <AddIcon fontSize="small" />
          </Button>
        </div>
      </S.Container>
    </S.Editor>
  );
};

export default Editor;
