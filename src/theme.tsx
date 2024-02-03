import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#341A41",
      100: "#EBD3F7",
      200: "#E2E8F0",
    },
    secondary: {
      50: "#FDF2F8",
      100: "#FCE7F3",
      200: "#FBCFE8",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#341A41",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        bg: "white",
        color: `#341A41`,
        border: `1px white solid`,
        _hover: {
          backgroundColor: "transparent",
          color: "white",
        },
      },
    },
  },
  fonts: {
    heading: "ubuntu-mono, sans-serif",
    body: "montserrat, ubuntu-mono, sans-serif",
  },
});

export default theme;
