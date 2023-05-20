import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
