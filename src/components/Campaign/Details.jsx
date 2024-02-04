import React from "react";
import {
  Box,
  Container,
  Center,
  Text,
  Heading,
  Progress,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

function Details() {
  return (
    <Container
      maxW="60%"
      h={"100vh"}
      my={8}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      <Heading>SolFunding for Janet</Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At nulla a
        cupiditate nam odit pariatur debitis libero expedita facere laborum!
      </Text>
      <Box mt={"40px"}>
        <Progress value={80} />
        <Flex justify={"flex-end"}>
          <Text mt={4}>$300 to reach goal🎉</Text>
        </Flex>
        <Flex justify={"center"}>
          <Button py={7} px={5}>
            Send Janet some Sol
          </Button>
        </Flex>
      </Box>
      {/* transaction */}
      <Box h={"100px"} />
      <Transactions />
    </Container>
  );
}

export default Details;

function Transactions() {
  return (
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
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
