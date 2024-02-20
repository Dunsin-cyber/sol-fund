import {
  Container,
  Box,
  Text,
  Flex,
  InputRightElement,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";

function Message() {
  return (
    <Container
      maxW={{ base: "90%", md: "60%" }}
      h={"100vh"}
      my={8}
      border={"1px solid white"}
      py={10}
      px={3}
    >
      <Box>
        {msg.map((m) => (
          <Flex
            key={m.id}
            gap={3}
            justifyContent={m.sender === "seeker" ? "flex-start" : "flex-end"}
          >
            <Box
              py={4}
              px={5}
              bgColor={m.sender === "seeker" ? `primary.200` : "#FFFFFF0D"}
              borderRadius="10px"
              maxW="60%"
              overflow="visible"
            >
              <Text>{m.text}</Text>
            </Box>
          </Flex>
        ))}
        {/* input section */}
        <Flex
          h="15%"
          mt={"400px"}
          className="chat-box"
          borderBottomRadius={5}
          alignItems="center"
          border={`1px solid primary.50`}
          color="white"
          mx={2}
        >
          <InputGroup size="md" px={4}>
            <Input
              pr="4.5rem"
              type="text"
              _placeholder={{ color: "primary.50" }}
              placeholder="Ask Your Question"
              variant="flushed"
            />
            <InputRightElement width="40px" px={3}>
              <Button
                h="100%"
                size="sm"
                bg={`primary.50`}
                color="white"
                px={6}
                w="100%"
                _hover={{
                  backgroundColor: "transparent",
                  border: `primary.50`,
                  color: `primary.50`,
                }}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </Container>
  );
}

export default Message;

const msg = [
  {
    id: 1,
    sender: "seeker",
    text: "Hey there, I am trying to raise fund. your help is very appreciated. Please feel free to ask any question",
  },
  {
    id: 2,
    sender: "donor",
    text: "Yea, thanks. How much do you need, and where are you located",
  },
  {
    id: 3,
    sender: "seeker",
    text: "Thanks so mch for showung interest",
  },
];
