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

function LandingPage() {
  const navigate = useNavigate();
  const { publicKey } = useWallet();

  const handleClick = async () => {
    navigate("profile");
  };

  return (
    <Box>
      <Box>
        <Flex zIndex={3}>
          <Text ml={6} my={3} fontSize="30px">
            SolFund
          </Text>
        </Flex>
        <Container>
          <Center flexDirection="column" mt={"40vh"}>
            <Text fontSize="60px">Get Help</Text>
            <Flex mt={5}>
              {publicKey ? (
                <Button onClick={handleClick}>Go to Profile</Button>
              ) : (
                <WalletMultiButton />
              )}
            </Flex>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
