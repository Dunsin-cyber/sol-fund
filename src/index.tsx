import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import WalletConnetProvider from "./WalletProvider";
import AppProvider from "./Context";
import theme from "./theme";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <WalletConnetProvider>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AppProvider>
    </WalletConnetProvider>
  </React.StrictMode>
);
