import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import TrendAndResent from "./pages/TrendAndRecent/TrendAndResent";
import Write from "./pages/Write/Write";
import Post from "./pages/Post/Post";
import UserPost from "./pages/UserPost/UserPost";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <CssVarsProvider>
        <Sheet
          style={{
            "--joy-fontFamily-body":
              '"AppleSDGothicNeo", "Public Sans",var(--joy-fontFamily-fallback, var(--joy--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
            "--joy-fontFamily-display":
              '"AppleSDGothicNeo","Public Sans",var(--joy-fontFamily-fallback, var(--joy--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
            "--joy-fontFamily-code":
              '"AppleSDGothicNeo",Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
            "--joy-fontFamily-fallback":
              '"AppleSDGothicNeo",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
          }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="trend" element={<TrendAndResent />} />
              <Route path="recent" element={<TrendAndResent />} />
              <Route path="write" element={<Write />} />
              <Route path=":user" element={<UserPost />} />
              <Route path=":user/:postId" element={<Post />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Sheet>
      </CssVarsProvider>
    </>
  );
};

export default App;
