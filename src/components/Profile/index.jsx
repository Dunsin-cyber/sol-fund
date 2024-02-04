import React from "react";
import {
  Box,
  Container,
  Center,
  Text,
  Flex,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function Index() {
  return (
    <Container
      maxW="60%"
      h={"100vh"}
      mt={10}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      <Heading>Statistics</Heading>
      <Flex justify={"space-between"}>
        <CircularProgress mt={10} value={40} size="250px" thickness="4px">
          <CircularProgressLabel>40%</CircularProgressLabel>
        </CircularProgress>
        {/* side details */}
        <Box>
          <Text>we are at 40 percent</Text>
        </Box>
      </Flex>
    </Container>
  );
}

export default Index;
