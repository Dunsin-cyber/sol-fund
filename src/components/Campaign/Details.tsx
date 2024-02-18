import React, { useEffect } from "react";
import {
  Box,
  Container,
  Center,
  Text,
  Heading,
  Progress,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context";
import Navbar from "../Navbar";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Details() {
  const { id }: any = useParams();
  const { getACampaign, recipient, donate, transactionPending } =
    React.useContext(AppContext);

  const { publicKey } = useWallet();

  const [amount, setAmount] = React.useState<number>(0);
  useEffect(() => {
    const call = async () => {
      if (id) {
        await getACampaign(id);
      }
    };
    call();
  }, [publicKey, id]);

  const amountLeft = recipient.amountRequired - recipient.amountDonated;
  const progress = (recipient.amountDonated / recipient.amountRequired) * 100;

  const parse: any = (val: string) => val.replace(/^\$/, "");
  const format = (val: number) => `$` + val;

  const handleDonate = async () => {
    await donate(amount);
  };
  return (
    <Container
      maxW={{ base: "90%", md: "60%" }}
      h={"100vh"}
      my={8}
      border={"1px solid white"}
      py={10}
      px={10}
    >
      {!publicKey ? (
        <Flex align="center" justify="center" flexDirection="column">
          <Text fontSize={"24px"}>
            Please connect a wallet to see full details and donate
          </Text>
          <WalletMultiButton />
        </Flex>
      ) : (
        <>
          <Navbar />
          <Heading>SolFunding for {recipient.name}</Heading>
          <Text>{recipient.description}</Text>
          <Box mt={"40px"}>
            <Progress value={progress} />
            <Flex justify={"flex-end"}>
              <Text mt={4}>
                $ {amountLeft.toLocaleString()} to reach goal🎉
              </Text>
            </Flex>
            <Flex justify={"center"} gap={3} flexDirection={"column"}>
              <NumberInput
                value={format(amount)}
                onChange={(value: string) => setAmount(parse(value))}
                defaultValue={0}
                clampValueOnBlur={false}
                h={"40px"}
              >
                <NumberInputField />
              </NumberInput>
              <Button
                py={7}
                px={5}
                onClick={handleDonate}
                isDisabled={amount < 0.1 || transactionPending}
                isLoading={transactionPending}
              >
                Send {recipient.name} some Sol
              </Button>
            </Flex>
          </Box>
          {/* transaction */}
          <Box h={"100px"} />
          <Transactions />
        </>
      )}
    </Container>
  );
}

export default Details;

function Transactions() {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Transaction details</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th> Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>
          <Tr>
            <Td>$2-23-2034</Td>
            <Td>$20</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$300</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
          <Tr>
            <Td>2-23-2034</Td>
            <Td>$500</Td>
            <Td>7sa87c8asc87ash8shc8ahs8has8c7</Td>
          </Tr>{" "}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
