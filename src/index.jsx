import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "./Context";
import theme from "./theme";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AppProvider>
    </React.StrictMode>
  );
  // Rest of your code using 'root'
} else {
  console.error("Root element not found in the document.");
}

// const root = ReactDOM.createRoot(document.getElementById("root"));

