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

function LandingPage() {
  const navigate = useNavigate();
  const { step } = React.useContext(AppContext);
  const { publicKey } = useWallet();

  const handleClick = () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const user = 1;
    //check if user exists
    if (user) {
      // if user exits, go to profile page,
      navigate("profile");
    } else {
      // else, go to onboaring
      navigate("onboarding");
    }
  };
  return (
    <Box>
      <Box>
        <Flex zIndex={3}>
          <Text ml={6} my={3} fontSize="30px">
            SolFunding
          </Text>
        </Flex>
        <Container>
          <Center flexDirection="column" mt={"40vh"}>
            <Text fontSize="60px">Get Help</Text>
            <Flex mt={5}>
              <Button onClick={handleClick}>Start a SolFunding</Button>
            </Flex>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
