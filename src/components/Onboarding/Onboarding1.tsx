import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Select,
  Show,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import { useWallet } from "@solana/wallet-adapter-react";

function Onboarding1() {
  const navigate = useNavigate();
  const { step, setStep } = React.useContext(AppContext);

  return (
    <Flex>
      {/* Left */}
      <Show above="md">
        <Box
          display="flex"
          justifyContent={"center"}
          pt="40vh"
          px="34px"
          // w={"30%"}
          bgColor="primary.50"
          color="white"
        >
          <Text fontSize="36px" fontWeight={700}>
            Let's begin your fundraising journey
          </Text>
        </Box>
      </Show>
      <Box h={"100vh"} w={"1px"} bgColor={"white"} />
      {/* Right */}
      <Box
        px={10}
        pl={{ md: "150px" }}
        pt={{ base: "5vh", md: "30vh" }}
        color="black"
        w={{ base: "90%", md: "70%" }}
        bgColor="primary.100"
      >
        <ArrowBackIcon
          mb={4}
          boxSize={6}
          onClick={() => {
            if (step === 1) return;
            setStep((prev: number) => prev - 1);
          }}
        />
        {step === 1 && <Step1 />}
        {step === 2 && <Onboarding2 />}
        {step === 3 && <Onboarding3 />}
      </Box>
    </Flex>
  );
}

export default Onboarding1;

const tagVal = [
  "School",
  "health",
  "children",
  "Travel",
  "Funeral",
  "Events",
  "Faith",
  "Family",
  "Education",
  "kids",
  "climate",
];

function Step1() {
  const { setStep, tags, setTags } = React.useContext(AppContext);
  const { publicKey } = useWallet();
  console.log(tags);

  const handleClick = () => {
    setStep(2);
  };
  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          Where will the funding go?
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          solana blockchain. You can fund with any of the solana tokens but
          primarily with solana
        </Text>
      </Box>
      {/* pick funding type */}
      <Flex pt={4}>
        <Select size="lg" variant="outline" placeholder="Solana">
          <option value="Solana">Solana</option>
          <option value="Jupiter">Jupiter</option>
          <option value="woof">Woof</option>
        </Select>
        <Input value={publicKey?.toString()} isReadOnly size="lg" />
      </Flex>
      {/* funding sector */}
      <Grid
        pt={8}
        templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(9, 1fr)" }}
        gap={6}
      >
        {tags.map((tag: any) => (
          <Tag
            cursor="pointer"
            py={4}
            pl={4}
            size="xl"
            variant="solid"
            borderRadius="full"
            key={tag}
          >
            {tag}
            <TagCloseButton />
          </Tag>
        ))}
      </Grid>
      <Text>what's the funding for?</Text>
      <Grid
        pt={8}
        templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(9, 1fr)" }}
        gap={6}
      >
        {tagVal.map((tag) => (
          <Tag
            cursor="pointer"
            py={4}
            px={4}
            size={{ base: "sm", md: "xl" }}
            variant="solid"
            key={tag}
            onClick={() => {
              setTags([...tags, tag]);
            }}
            bgColor={"primary.50"}
          >
            <TagLabel> {tag}</TagLabel>
          </Tag>
        ))}
      </Grid>
      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={handleClick}
          isDisabled={tags.length < 2}
        >
          Next Step
        </Button>
      </Flex>
    </Box>
  );
}
