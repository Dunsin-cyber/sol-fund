import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Show above="md">
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
      </Show>
      <Show below="md">
        <Flex justify="flex-end">
          <Button onClick={onOpen}>Menu</Button>
        </Flex>
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />

          <DrawerContent backgroundColor="#EBD3F7">
            <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
            <DrawerBody>
              <Link to="/campaign">
                <Text my={6} fontSize={"18px"}>
                  Campaigns
                </Text>
              </Link>
              <Link to="/profile">
                <Text my={6} fontSize={"18px"}>
                  Profile
                </Text>
              </Link>
              <WalletMultiButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
}

export default Nav;
