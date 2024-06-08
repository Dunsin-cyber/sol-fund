import React from "react";
import { Box, Text, Link, Flex, Button, Hide } from "@chakra-ui/react";

function Nav2() {
  return (
    <Flex justify="space-between" mx="48px" mt="24px">
      <Flex>
        <Text size="24px" fontStyle="bold" fontWeight={700}>
          SOLFUND
        </Text>
      </Flex>
      <Hide below="md">
        <Flex gap={12} align="center" justify="center">
          <Button
            borderRadius={"10px"}
            variant={"purple"}
            cursor={"pointer"}
            px={3}
            py={5}
            borderColor={"purple"}
          >
            Home
          </Button>
          <Text cursor={"pointer"}>Learn</Text>
          <Text cursor={"pointer"}>Community</Text>
          <Text cursor={"pointer"}>Support</Text>
        </Flex>
      </Hide>
    </Flex>
  );
}

export default Nav2;
