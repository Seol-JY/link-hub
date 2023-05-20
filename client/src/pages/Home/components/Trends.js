import styled from "styled-components";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import AddIcon from "@mui/icons-material/Add";

const S = {
  Trends: styled.div`
    background-color: #fbfbfb;
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
    min-height: 600px;
    height: calc(100vh - 500px);
    transition: 0.3s;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
    max-height: 1000px;
  `,
  RootWrappper: styled.div`
    letter-spacing: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: left;
    height: 100%;
    margin-left: auto;
    margin-right: auto;

    justify-content: center;
  `,

  Title: styled.h2`
    text-align: left;
    box-sizing: inherit;
    margin: 0;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1.2;
    color: #0a1929;
    margin-top: 17px;
    margin-bottom: 20px;
    max-width: 500px;
  `,
};

const Trends = () => {
  return (
    <S.Trends>
      <S.Container>
        <S.RootWrappper>
          <S.Title> 요즘 뜨는 북마크 🔥</S.Title>
          <div>
            <Button variant="solid" color="neutral" style={{ marginRight: "8px", borderRadius: "20px" }}>
              인기 순
            </Button>
            <Button variant="outlined" color="neutral" style={{ marginRight: "4px", borderRadius: "20px" }}>
              최신 순
            </Button>
          </div>
          <Box style={{ display: "flex", flexDirection: "row", marginTop: "15px", paddingBottom: "20px" }}>
            <Card variant="outlined" sx={{ width: 320, marginRight: "20px" }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                개발 유튜버 모음
              </Typography>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                요즘 즐겨보는 개발 유튜버 모음입니다!
              </Typography>
              <Divider />
              <CardOverflow
                variant="soft"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  px: "var(--Card-padding)",
                  bgcolor: "background.level1",
                }}
              >
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  6.3k views
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  1 hour ago
                </Typography>
              </CardOverflow>
            </Card>

            <Card variant="outlined" sx={{ width: 320, marginRight: "20px" }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                쇼핑몰 사이트 모음
              </Typography>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                국내 쇼핑몰 모음이에요.
              </Typography>
              <Divider />
              <CardOverflow
                variant="soft"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  px: "var(--Card-padding)",
                  bgcolor: "background.level1",
                }}
              >
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  6.3k views
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  1 hour ago
                </Typography>
              </CardOverflow>
            </Card>
            <Card variant="outlined" sx={{ width: 320, marginRight: "20px" }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                구직 관련 사이트
              </Typography>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                제가 취준할때 도움 받았던 사이트 모음이에요~!
              </Typography>
              <Divider />
              <CardOverflow
                variant="soft"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  px: "var(--Card-padding)",
                  bgcolor: "background.level1",
                }}
              >
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  6.3k views
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: "md", color: "text.secondary" }}>
                  1 hour ago
                </Typography>
              </CardOverflow>
            </Card>
          </Box>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button variant="outlined" color="neutral" style={{ marginRight: "4px", borderRadius: "20px" }}>
              더보기
              <AddIcon color="disabled" />
            </Button>
          </div>
        </S.RootWrappper>
      </S.Container>
    </S.Trends>
  );
};

export default Trends;
