import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, NavLink, useNavigate } from "react-router-dom";

function index() {
  return (
    <Flex
      px={10}
      h={"70px"}
      py={8}
      bg="primary.50"
      w="100%"
      align="center"
      justify={"space-evenly"}
      color="white"
      border={"1px solid"}
      mb={8}
      borderRadius={"5px"}
      borderTopStyle={"none"}
    >
      <Link to="/campaign">
        <Text fontSize={"24px"}>Campaigns</Text>
      </Link>
      <Link to="/profile">
        <Text fontSize={"24px"}>Profile</Text>
      </Link>
      <WalletMultiButton />
    </Flex>
  );
}

export default index;
