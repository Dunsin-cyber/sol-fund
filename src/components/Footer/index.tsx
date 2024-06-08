import React from "react";
import { Box, Text, Link, Flex, Button } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      justify={{ md: "space-evenly" }}
      flexDirection={{ base: "column", md: "row" }}
      align={{ base: "center" }}
      mt={8}
    >
      <Flex>
        <Text size="24px" fontWeight={500}>
          Powered by Solana
        </Text>
      </Flex>
      <Flex>
        <Text cursor={"pointer"}>Terms &nbsp;</Text>
        <Text color="purple" cursor={"pointer"}>
          and &nbsp;
        </Text>
        <Text cursor={"pointer"}>Conditions</Text>
      </Flex>
      <Flex>Twitter</Flex>
    </Flex>
  );
}

export default Footer;
