import React from "react";
import {
  Badge,
  Box,
  Center,
  Flex,
  Image,
  Text,
  Container,
  Grid,
  Heading,
} from "@chakra-ui/react";

function index() {
  return (
    <Container maxW="70%">
      <Box my={5}>
        <Heading>Campaigns</Heading>
        <Text py={4} fontSize={"24px"}>
          This is the market place of different soalers who need funds, click on
          any to fund
        </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Card />
        <Card /> <Card /> <Card /> <Card /> <Card /> <Card /> <Card />
      </Grid>
    </Container>
  );
}

export default index;

function Card() {
  return (
    <Center>
      <Box p="5" maxW="320px" borderWidth="1px" cursor="pointer">
        <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">verified</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}
