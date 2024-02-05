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

function LandingPage() {
  const navigate = useNavigate();
  const { getUser,user, transactionPending } = React.useContext(AppContext);
  const { publicKey } = useWallet();

  // useGetUser()

  const handleClick = async () => {
   await getUser()
    if(user && !transactionPending) {
      navigate("profile");
      toast.success("welcome back")

    } else if (!user && transactionPending) {
      // else, go to onboaring
      toast.success("welcoome, create an account")
      navigate("onboarding");

    }
    }
  
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
              <Button isLoading={transactionPending} onClick={handleClick}>Start a SolFunding</Button>
            </Flex>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
