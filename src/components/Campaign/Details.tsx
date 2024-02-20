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
import { Navigate, Router, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context";
import Navbar from "../Navbar";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAppSelector } from "../../redux/hook";
import { TransactionT } from "../../redux/types";
import { ChatIcon } from "@chakra-ui/icons";

function Details() {
  const { id }: any = useParams();
  const { getACampaign, donate, transactionPending } =
    React.useContext(AppContext);

  const recipient = useAppSelector((state) => state.recipient);
  console.log(recipient);

  const navigate = useNavigate();

  const { publicKey } = useWallet();

  const [amount, setAmount] = React.useState<number>(0);
  React.useMemo(() => {
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
          {recipient.name.length > 2 ? (
            <>
              <Heading textAlign="center">
                SolFunding for {recipient.name}
              </Heading>
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
                  {/* Message */}
                  <Flex
                    justify="flex-end"
                    gap={3}
                    cursor={"pointer"}
                    onClick={() => navigate("/message")}
                  >
                    <Text>Send a Message</Text>
                    <ChatIcon color="primary.50" boxSize={6} />
                  </Flex>
                </Flex>
              </Box>
              {/* transaction */}
              <Box h={"100px"} />
              <Transactions />
            </>
          ) : (
            <Heading textAlign={"center"}>
              Opps!... You can't solFund yourself
            </Heading>
          )}
        </>
      )}
    </Container>
  );
}

export default Details;

export function Transactions() {
  const transaction = useAppSelector((state) => state.transction);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Transaction details</TableCaption>
        <Thead>
          <Tr>
            <Th>Signature</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction?.map((val: TransactionT) => (
            <Tr key={val.transactionNo}>
              <Td>{val.signature.slice(0, 30)}...</Td>
              <Td>{val.time.toISOString()}</Td>
              <Td>{val.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
