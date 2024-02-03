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

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Transaction details</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th> Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>2-23-2034</Td>
              <Td>$500</Td>
              <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
            </Tr>
            <Tr>
              <Td>$2-23-2034</Td>
              <Td>$20</Td>
              <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>$300</Td>
              <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Index;
