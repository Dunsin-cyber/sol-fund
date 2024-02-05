import React from "react";
import {
  Box,
  Container,
  Center,
  Text,
  Flex,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
} from "@chakra-ui/react";
import { AppContext } from "../../Context";
import { useLocation } from "react-router-dom";

function Index() {
  const { user } = React.useContext(AppContext);
  const location = useLocation();
  const fullUrl = window.location.href;

  const percentDonated = (user?.amountDonated / user?.amountRequired) * 100;
  return (
    <Container
      maxW="60%"
      h={"100vh"}
      mt={10}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      <Heading>Profile</Heading>
      <Flex justify={"space-evenly"} align={"center"}>
        <CircularProgress
          mt={10}
          value={percentDonated}
          size="250px"
          thickness="4px"
        >
          <CircularProgressLabel>{percentDonated}%</CircularProgressLabel>
        </CircularProgress>
        {/* <Text>we are at 40 percent</Text> */}
        {/* side details */}
        <Box>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Name
            </Text>
            <Text fontSize={"24px"}> {user?.name}</Text>
          </Flex>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Request
            </Text>
            <Text fontSize={"24px"}> {user.amountRequired}</Text>
          </Flex>
          <Flex justify={"center"} align={"center"} my={3} gap={3}>
            <Text fontWeight="500" fontSize={"36px"}>
              Donated
            </Text>
            <Text fontSize={"24px"}> {user.amountDonated}</Text>
          </Flex>
        </Box>
      </Flex>
      <Center>
        <Flex mt={10} gap={3} justify={"center"} align={"center"}>
          <Heading>Copy Donation Link</Heading>
          <Link>
            <Heading fontStyle={"italic"} color="green">
              {fullUrl}
            </Heading>
          </Link>
        </Flex>
      </Center>
    </Container>
  );
}

export default Index;
