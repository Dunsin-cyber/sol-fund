import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";

function Onboarding2() {
  const { setStep } = React.useContext(AppContext);
  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          How much would you like to raise?
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          solana blockchain. You can fund with any of the solana tokens but
          primarily with solana
        </Text>
      </Box>
      {/* pick funding type */}
      <Flex pt={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="primary.50"
            fontSize="1.2em"
          >
            $
          </InputLeftElement>
          <Input placeholder="Enter amount" />
        </InputGroup>
        <Input placeholder="equivalen solana presently" size="lg" />
      </Flex>
      {/* funding sector */}

      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={() => {
            setStep(3);
          }}
        >
          Next Step
        </Button>
      </Flex>
    </Box>
  );
}

export default Onboarding2;
