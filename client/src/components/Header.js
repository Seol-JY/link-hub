import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/svg/Logo.svg";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/joy/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

const S = {
  Header: styled.header`
    letter-spacing: 0px;
    box-sizing: inherit;
    position: sticky;
    top: 0;
    transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    z-index: 1100;
    backdrop-filter: blur(8px);
    box-shadow: rgb(231, 235, 240) 0px -1px 1px 0px inset;
    background-color: rgba(255, 255, 255, 0.8);
  `,
  Container: styled.div`
    letter-spacing: 0px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-height: 60px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1200px;
  `,
  LogoWrapper: styled.a`
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    line-height: 0;
    margin-right: 20px;
  `,
  NavWrapper: styled.div`
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    letter-spacing: 0px;
    box-sizing: inherit;
    display: initial;
  `,
  Nav: styled.nav`
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    letter-spacing: 0px;
    box-sizing: inherit;
  `,
  Ul: styled.ul`
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    color: black;
    letter-spacing: 0px;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
  `,
  Li: styled.li`
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    list-style: none;
    box-sizing: inherit;
    color: #1a2027;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: 0;
    display: flex;
    align-items: center;
  `,
  MenuWrapper: styled.div`
    letter-spacing: 0;
    box-sizing: inherit;
    display: flex;
    flex-direction: row;
    margin-left: auto;
  `,
  Search: styled.div`
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    box-sizing: inherit;
    min-height: 34px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px 15px 0px 0px;
    padding-left: 6px;
    position: relative;
    background-color: #f3f6f9;
    color: #3e5060;
    font-size: 0.875rem;
    border: 1px solid #e0e3e7;
    border-radius: 17px;
    cursor: pointer;
    transition-property: all;
    transition-duration: 150ms;
    min-width: 150px;
  `,
};

const Header = () => {
  const isLogin = true;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isWriteMode, setIsWriteMode] = useState(false);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (location.pathname === "/write") {
      setIsWriteMode(true);
    } else {
      setIsWriteMode(false);
    }
  }, [location]);

  return (
    <S.Header>
      <S.Container>
        <S.LogoWrapper
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
          LinkHub
        </S.LogoWrapper>
        <S.NavWrapper>
          {isWriteMode ? (
            ""
          ) : (
            <S.Nav>
              <S.Ul>
                <S.Li>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => {
                      navigate("/trend");
                    }}
                  >
                    트랜딩
                  </Button>
                </S.Li>
                <S.Li>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => {
                      navigate("/recent");
                    }}
                  >
                    최신
                  </Button>
                </S.Li>
              </S.Ul>
            </S.Nav>
          )}
        </S.NavWrapper>
        <S.MenuWrapper>
          <S.Ul>
            <S.Li>
              {isWriteMode ? (
                ""
              ) : (
                <Button
                  size="sm"
                  variant="plain"
                  color="neutral"
                  style={{ marginRight: "4px" }}
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  <SearchIcon />
                </Button>
              )}
            </S.Li>
            {isLogin ? (
              <>
                {isWriteMode ? (
                  ""
                ) : (
                  <S.Li>
                    <Button
                      size="sm"
                      style={{ marginRight: "12px", borderRadius: "18px" }}
                      onClick={() => {
                        navigate("/write");
                      }}
                    >
                      새 북마크 작성
                    </Button>
                  </S.Li>
                )}
                <S.Li style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
                  <Avatar size="sm" variant="soft">
                    se
                  </Avatar>
                  <ArrowDropDownIcon />
                </S.Li>
                <Menu
                  size="md"
                  variant="outlined"
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  open={open}
                  placement="bottom-end"
                  style={{ zIndex: "10000" }}
                >
                  <MenuItem onClick={handleClose}>
                    내 북마크
                    <ListItemDecorator />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    로그아웃
                    <ListItemDecorator />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <S.Li>
                <Button
                  size="sm"
                  style={{ marginRight: "12px", borderRadius: "18px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Button>
              </S.Li>
            )}
          </S.Ul>
        </S.MenuWrapper>
      </S.Container>
    </S.Header>
  );
};

export default Header;
