import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import TrendAndResent from "./pages/TrendAndRecent/TrendAndResent";
import Write from "./pages/Post/Write";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyle />
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
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
