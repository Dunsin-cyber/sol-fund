import React, { ReactElement } from "react";
import { Box, Flex, Text, Hide, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { TbWorld } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { BsRepeat } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { Avatar } from "@chakra-ui/react";

function Index({ children }: any) {
  const navigate = useNavigate();
  return (
    <Flex h="100vh" bgColor="#C5AFEA">
      {/* left */}
      <Hide below="md">
        <Box
          h="100vh"
          w="20%"
          justifyContent={"flex-start"}
          mt={8}
          alignItems={"flex-start"}
          display="flex"
          flexDirection={"column"}
          gap={10}
          px={"4%"}
        >
          <Text size="24px" fontStyle="bold" fontWeight={600} color="#181425">
            SOLFUND
          </Text>
          <Box />
          <WalletMultiButton
            style={{
              maxWidth: "200px",
              fontSize: "10px",
              backgroundColor: "#0a0315",
              textWrap: "wrap",
            }}
          />
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <FiHome />
            <Text>Dashboard</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
            onClick={() => {
              navigate("/campaign");
            }}
          >
            <GoPeople color="black" />
            <Text>CrowdFund</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
            onClick={() => {
              navigate("/campaign");
            }}
          >
            <TbWorld />
            <Text>Campaign</Text>
          </Flex>
          <Flex
            fontWeight={600}
            color="black"
            justify="center"
            align="center"
            gap={1}
            cursor="pointer"
            borderRadius="md"
            py={3}
            px={3}
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{
              bg: "purple.600",
              transform: "scale(1.05)",
            }}
            _focus={{ boxShadow: "outline" }}
          >
            <BsRepeat color="black" />
            <Text>Swap</Text>
          </Flex>
        </Box>
      </Hide>
      {/* middle */}
      <Box
        bgColor={"#181425"}
        bgGradient="linear(to-br, #0A0315, #2C014D)"
        borderRadius={{ base: "0px", md: "15px" }}
        w={{ base: "100%", md: "80%" }}
      >
        {children}
      </Box>
      {/* right */}
    </Flex>
  );
}

export default Index;
