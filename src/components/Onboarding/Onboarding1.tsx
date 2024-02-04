import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Select,
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
  const { connected, select } = useWallet();

  console.log(connected);

  return (
    <Flex>
      {/* Left */}
      <Box
        display="flex"
        justifyContent={"center"}
        pt="40vh"
        px="34px"
        w={"30%"}
      >
        <Text fontSize="36px" fontWeight={700}>
          Let's begin your fundraising journey
        </Text>
      </Box>
      <Box h={"100vh"} w={"1px"} bgColor={"white"} />
      {/* Right */}
      <Box
        px={10}
        pl="150px"
        pt="30vh"
        color="black"
        w="70%"
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
  const { setStep } = React.useContext(AppContext);
  const [tags, setTags] = React.useState<string[]>([]);

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
        <Input placeholder="wallet Address" size="lg" />
      </Flex>
      {/* funding sector */}
      <Grid pt={8} templateColumns="repeat(9, 1fr)" gap={6}>
        {tags.map((tag) => (
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
      <Grid pt={8} templateColumns="repeat(9, 1fr)" gap={6}>
        {tagVal.map((tag) => (
          <Tag
            cursor="pointer"
            py={4}
            pl={4}
            size="xl"
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
        >
          Next Step
        </Button>
      </Flex>
    </Box>
  );
}
