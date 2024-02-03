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

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box>
      {/* <Flex position="fixed"> */}
      {/* </Flex> */}
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
              <Button onClick={() => navigate("onboarding")}>
                Start a SolFunding
              </Button>
            </Flex>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
