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
  Progress,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Campaign() {
  const { campaigns, getAllCampaigns } = React.useContext(AppContext);
  React.useEffect(() => {
    if (campaigns.length < 1) {
      getAllCampaigns();
    }
  }, []);
  return (
    <Container
      maxW={{ base: "90%", md: "60%" }}
      mt={10}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      <Navbar />
      <Box my={5}>
        <Heading>Campaigns</Heading>
        <Text py={4} fontSize={"24px"}>
          This is the market place of different soalers who need funds, click on
          any to fund
        </Text>
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
      >
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

export default Campaign;

type CardT = {
  id: string;
  name: string;
  description: string;
  amountRequired: number;
  amountDonated: number;
};

function Card({ id, name, description, amountDonated, amountRequired }: CardT) {
  const progress = (amountDonated / amountRequired) * 100;

  const pics = [
    "pic-1.jpg",
    "pic-2.jpg",
    "pic-3.jpg",
    "pic-4.jpg",
    "pic-5.jpg",
    "pic-6.jpg",
    "pic-7.jpg",
    "pic-8.jpg",
    "pic-9.jpg",
    "pic-10.jpg",
    "coin.jpg",
  ];

  const random = Math.floor(Math.random() * pics.length);
  return (
    <Center>
      <Box
        p="5"
        maxW="320px"
        borderWidth="1px"
        cursor="pointer"
        transform="auto"
        // onClick={onClick}
        _hover={{ transform: `scale(1.09)`, transition: "transform 0.3s ease" }}
        _active={{
          transform: `scale(1.09)`,
          transition: "transform 0.3s ease",
        }}
      >
        <Image borderRadius="md" src={`/dummyPic/${pics[random]}`} />
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
        {/* <Text mt={2}>${amountRequired}</Text> */}
        <Progress value={progress} />
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            <b>{amountRequired}</b>({amountDonated})
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}
