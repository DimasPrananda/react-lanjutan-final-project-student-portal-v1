import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import "./style.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#dbe4ff",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <CSSReset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);
