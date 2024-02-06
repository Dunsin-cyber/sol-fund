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
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Index() {
  const { campaigns, getAllCampaigns } = React.useContext(AppContext);
  console.log(campaigns);
  React.useMemo(() => {
    getAllCampaigns();
  }, []);
  return (
    <Container maxW="60%" mt={10} border={"1px solid white"} py={10} px={10}>
      <Navbar />
      <Box my={5}>
        <Heading>Campaigns</Heading>
        <Text py={4} fontSize={"24px"}>
          This is the market place of different soalers who need funds, click on
          any to fund
        </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {campaigns?.map((camp) => (
          <Link
            style={{ textDecoration: "none" }}
            key={camp[0].pubKey}
            to={`/details/${camp[0].pubKey}`}
          >
            <Card
              id={camp[0].pubKey}
              amountDonated={camp[0].amountDonated}
              amountRequired={camp[0].amountRequired}
              name={camp[0].name}
              description={camp[0].description}
            />
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

export default Index;

type CardT = {
  id: string;
  name: string;
  description: string;
  amountRequired: number;
  amountDonated: number;
};

function Card({ id, name, description, amountDonated, amountRequired }: CardT) {
  return (
    <Center>
      <Box p="5" maxW="320px" borderWidth="1px" cursor="pointer">
        <Image borderRadius="md" src="coin.jpg" />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">New</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
          >
            {name}
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {description}
        </Text>
        <Text mt={2}>${amountRequired}</Text>
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            <b>{amountRequired}</b>({amountDonated})
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}
