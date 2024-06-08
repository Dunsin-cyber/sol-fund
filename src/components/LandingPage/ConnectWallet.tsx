import React from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetUser } from "../functions";
import toast from "react-hot-toast";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "../Navbar/Nav2";
import Footer from "../Footer";

function ConnectWallet() {
  const navigate = useNavigate();
  const { publicKey } = useWallet();

  const handleClick = async () => {
    navigate("/profile");
  };

  return (
    <Box h="100vh">
      <Box h={"85vh"}>
        <Navbar />
        <Container mt={"30vh"}>
          <Center flexDirection="column">
            <Text
              fontWeight={500}
              textAlign={"center"}
              fontSize={{ base: "24px", md: "32px" }}
              mx={"8%"}
            >
              Connect your wallet to raise funds with Solana and other assets
            </Text>
            <Flex mt={8}>
              {publicKey ? (
                <Button onClick={handleClick}>Go to Profile</Button>
              ) : (
                <WalletMultiButton />
              )}
            </Flex>
          </Center>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default ConnectWallet;
