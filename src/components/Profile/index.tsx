import React, { useState } from "react";
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
  Link,
  Input,
  Button,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

const AnimatedCopyIcon = motion(CopyIcon);

function Index() {
  const { user } = React.useContext(AppContext);
  const location = useLocation();
  const { publicKey } = useWallet();
  const fullUrl = window.location.origin + "/details/" + publicKey?.toString();

  const percentDonated = (user?.amountDonated / user?.amountRequired) * 100;

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const variants = {
    normal: { scale: 1 },
    hovered: { scale: 1.2 },
    clicked: { rotate: 360, scale: 1.2, color: "#341A41" },
  };

  return (
    <Container
      maxW={{ base: "85%", md: "60%" }}
      h={"100vh"}
      mt={10}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      <Navbar />
      <Heading>Profile</Heading>
      <Flex
        justify={"space-evenly"}
        align={"center"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <CircularProgress
          mt={10}
          value={percentDonated}
          size="250px"
          thickness="4px"
        >
          <CircularProgressLabel>
            {Math.floor(percentDonated)}%
          </CircularProgressLabel>
        </CircularProgress>
        {/* <Text>we are at 40 percent</Text> */}
        {/* side details */}
        <Box>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Name
            </Text>
            <Text fontSize={"24px"}> {user?.name}</Text>
          </Flex>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Request
            </Text>
            <Text fontSize={"24px"}> {user.amountRequired}</Text>
          </Flex>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Donated
            </Text>
            <Text fontSize={"24px"}> {user.amountDonated}</Text>
          </Flex>
          <Flex mt={10} gap={3} justify={"center"} align={"center"}>
            <Text fontWeight="500">Donation Link</Text>
            <Link>
              <Input
                fontStyle={"italic"}
                color="primary.50"
                isReadOnly
                value={fullUrl}
                w={"170px"}
              />
              <CopyToClipboard text={fullUrl}>
                <AnimatedCopyIcon
                  boxSize={6}
                  variants={variants}
                  initial="normal"
                  animate={
                    isClicked ? "clicked" : isHovered ? "hovered" : "normal"
                  }
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setIsClicked(!isClicked)}
                />
              </CopyToClipboard>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Center>
        <Heading my={8} textAlign={"center"}>
          Transaction History
        </Heading>
      </Center>
    </Container>
  );
}

export default Index;
