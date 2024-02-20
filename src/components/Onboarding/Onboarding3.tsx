import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

function Onboarding3() {
  const { bio, setBio, initUser } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    initUser();
  };
  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          Create an Account
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          solana blockchain. You can fund with any of the solana tokens but
          primarily with solana
        </Text>
      </Box>
      {/* put your details */}
      <Flex flexDirection="column" gap={3} pt={4} w={"100%"}>
        <Text my={3}>Name</Text>
        <Input
          value={bio.name}
          onChange={(e) =>
            setBio({
              ...bio,
              name: e.target.value,
            })
          }
          name="name"
          placeholder="what is your name"
        />
        <Text my={3}>Description</Text>
        <Textarea
          value={bio.description}
          onChange={(e) =>
            setBio({
              ...bio,
              description: e.target.value,
            })
          }
          placeholder="write a short reason for your solana funding"
        />
      </Flex>

      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={handleCreateUser}
          isDisabled={bio.name.length < 3 && bio.description.length < 3}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
}

export default Onboarding3;
