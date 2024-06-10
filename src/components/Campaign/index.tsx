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
import { CampaignT } from "../../redux/types";
import { useAppSelector } from "../../redux/hook";

import HalfSide from "../SideNav/HalfSide";

function Campaign() {
  const { getAllCampaigns } = React.useContext(AppContext);
  React.useEffect(() => {
    getAllCampaigns();
  }, []);

  const campaigns = useAppSelector((state) => state.campaign);
  return (
    <HalfSide>
      <Flex
        gap={6}
        mt={3}
        h="100vh"
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
        }}
        flexDirection={"column"}
      >
        <Flex justify="Center" align="center">
          <Text fontWeight={600}>Campaign</Text>
        </Flex>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {campaigns?.map((camp: CampaignT) => (
            <Link
              style={{ textDecoration: "none" }}
              key={camp.pubKey}
              to={`/details/${camp.pubKey}`}
            >
              <Card
                id={camp.pubKey}
                amountDonated={camp.amountDonated}
                amountRequired={camp.amountRequired}
                name={camp.name}
                description={camp.description}
              />
            </Link>
          ))}
        </Grid>
      </Flex>
    </HalfSide>
    // <Container
    //   maxW={{ base: "90%", md: "60%" }}
    //   mt={10}
    //   border={"1px solid white"}
    //   py={10}
    //   px={10}
    // >
    //   <Navbar />
    //   <Box my={5}>
    //     <Heading>Campaigns</Heading>
    //     <Text py={4} fontSize={"24px"}>
    //       This is the market place of different soalers who need funds, click on
    //       any to fund
    //     </Text>
    //   </Box>
    //   <Grid
    //     templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
    //     gap={6}
    //   >
    //     {campaigns?.map((camp: CampaignT) => (
    //       <Link
    //         style={{ textDecoration: "none" }}
    //         key={camp.pubKey}
    //         to={`/details/${camp.pubKey}`}
    //       >
    //         <Card
    //           id={camp.pubKey}
    //           amountDonated={camp.amountDonated}
    //           amountRequired={camp.amountRequired}
    //           name={camp.name}
    //           description={camp.description}
    //         />
    //       </Link>
    //     ))}
    //   </Grid>
    // </Container>
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
        maxW="301px"
        border="none"
        // bgColor=
        cursor="pointer"
        transform="auto"
        // onClick={onClick}
        _hover={{ transform: `scale(1.09)`, transition: "transform 0.3s ease" }}
        _active={{
          transform: `scale(1.09)`,
          transition: "transform 0.3s ease",
        }}
      >
        <Image
          w="271px"
          h="159px"
          borderRadius="md"
          src={`/dummyPic/${pics[random]}`}
        />
        <Flex align="baseline" mt={2}>
          <Text ml={2} fontSize="sm">
            {name}
          </Text>
        </Flex>
        <Text mt={2} fontSize="sm" lineHeight="short">
          {description}
        </Text>
        {/* <Text mt={2}>${amountRequired}</Text> */}
        <Progress value={progress} />
        <Flex mt={2} justify="space-between" align="center">
          <Text ml={1} fontSize="sm">
            <b>${amountDonated}</b>
          </Text>
          <Text ml={1} fontSize="sm">
            <b>${amountRequired}</b>
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}
