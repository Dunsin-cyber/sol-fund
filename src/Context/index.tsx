import React from "react";
import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Connection } from "@solana/web3.js";
import idl from "../idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

type bioT = {
  name: string;
  description: string;
};

type campaignT = {
  pubKey: string;
  name: string;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
  id: number;
};

type recipientT = {
  name: string;
  description: string;
  amountDonated: number;
  amountRequired: number;
  publicKey: any;
};

export const AppContext = React.createContext<{
  step: number;
  setStep: any;
  smartContract: any;
  user: any;
  transactionPending: any;
  getUser: any;
  tags: any;
  setTags: any;
  bio: bioT;
  setBio: any;
  initialized: any;
  amount: number;
  setAmount: any;
  initUser: any;
  getAllCampaigns: any;
  campaigns: [campaignT][];
  setCampaigns: any;
  getACampaign: any;
  recipient: recipientT;
  donate: any;
}>({
  step: 1,
  setStep: undefined,
  smartContract: undefined,
  user: undefined,
  transactionPending: undefined,
  getUser: undefined,
  tags: undefined,
  setTags: undefined,
  bio: { name: "", description: "" },
  setBio: undefined,
  initialized: undefined,
  amount: 0,
  setAmount: undefined,
  initUser: undefined,
  getAllCampaigns: undefined,
  campaigns: [],
  setCampaigns: undefined,
  getACampaign: undefined,
  recipient: {
    publicKey: "",
    name: "",
    description: "",
    amountDonated: 0,
    amountRequired: 0,
  },
  donate: undefined,
});

export const AppProvider = ({ children }: any) => {
  const [step, setStep] = React.useState<number>(1);
  const [transactionPending, setTransactionPending] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [bio, setBio] = React.useState({
    name: "",
    description: "",
  });
  const [amount, setAmount] = React.useState<number>(0);
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [user, setUser] = React.useState({
    name: "",
    amountDonated: 0,
    amountRequired: 0,
    description: "",
    donationComplete: false,
  });
  const [campaigns, setCampaigns] = React.useState<[campaignT][]>([]);
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipient, setRecipient] = React.useState({
    publicKey: publicKey,
    name: "",
    description: "",
    amountDonated: 0,
    amountRequired: 0,
  });
  // console.log("publickey type", publicKey);

  const smartContract = React.useMemo(() => {
    if (anchorWallet && publicKey) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(idl as any, PROGRAM_KEY, provider);
    }
  }, [connection, anchorWallet]);

  const getUser = async () => {
    setTransactionPending(true);
    try {
      if (smartContract && publicKey) {
        const [CampaignPda] = findProgramAddressSync(
          [utf8.encode("COMPAIGN_DEMO"), publicKey.toBuffer()],
          smartContract.programId
        );

        const data: any = await smartContract.account.campaign.fetch(
          CampaignPda
        );

        if (data) {
          setUser({
            ...user,
            name: data.name,
            amountDonated: data.amountDonated.toNumber(),
            amountRequired: data.amountRequired.toNumber(),
            description: data.description,
            donationComplete: data.donationComplete,
          });
        }
        setInitialized(true);
        setTransactionPending(false);
        navigate(location.state);
        return;
      }
    } catch (err: any) {
      if (err.message.includes("Account does not exist or has no data")) {
        toast.success("Welcome, create an Account");
        navigate("onboarding");
        return;
      }
      toast.success(err.message);

      console.log(err.message);
    }
  };

  const initUser = async () => {
    setTransactionPending(true);
    try {
      if (smartContract && publicKey) {
        const [CampaignPda] = findProgramAddressSync(
          [utf8.encode("COMPAIGN_DEMO"), publicKey.toBuffer()],
          smartContract.programId
        );

        await smartContract.methods
          .create(
            bio.name,
            new anchor.BN(12),
            new anchor.BN(amount),
            tags,
            bio.description
          )
          .accounts({
            campaign: CampaignPda,
            user: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        navigate("/profile");
      }
    } catch (err: any) {
      toast.success(err.message);

      console.log(err);
    } finally {
      setTransactionPending(false);
    }
  };

  const getAllCampaigns = async () => {
    try {
      if (smartContract && publicKey) {
        setTransactionPending(true);
        // campaigns.length = 0;
        const data = await smartContract.account.campaign.all();
        // campaigns.map((d) => d.pop());
        if (data) {
          data.forEach((d: any) => {
            var res = {
              pubKey: d.publicKey.toString(),
              name: d.account.name,
              amountDonated: d.account.amountDonated.toNumber(),
              amountRequired: d.account.amountRequired.toNumber(),
              description: d.account.description,
              donationComplete: d.account.donationComplete,
              id: d.account.id,
            };
            campaigns.push([res]);
          });
          return;
        }
      }
    } catch (err: any) {
      toast.success(err.message);
      console.log(err);
    } finally {
      setTransactionPending(false);
    }
  };

  const getACampaign = async (pub: string) => {
    try {
      if (smartContract && publicKey) {
        const campaign = await smartContract.account.campaign.all();
        if (campaign) {
          // console.log(campaign)
          // const val: any = campaign.find((d) => {
          //   return d.publicKey.toString() === pub;
          // });
          campaign.map((val: any) => {
            if (val.publicKey.toString() == pub) {
              console.log("val", val);
              setRecipient({
                ...recipient,
                publicKey: val.publicKey,
                name: val.account.name,
                description: val.account.description,
                amountDonated: val.account.amountDonated.toNumber(),
                amountRequired: val.account.amountRequired.toNumber(),
              });
            }
          });
        }
      }
    } catch (err: any) {
      toast.success(err.message);
      console.log(err);
    } finally {
      setTransactionPending(false);
    }
  };

  const donate = async (val: number) => {
    try {
      setTransactionPending(true);
      if (smartContract && publicKey && recipient.publicKey) {
        const [CampaignPda] = findProgramAddressSync(
          [utf8.encode("COMPAIGN_DEMO"), recipient.publicKey.toBuffer()],
          smartContract.programId
        );

        await smartContract.methods
          .donate(new anchor.BN(val))
          .accounts({
            campaign: recipient.publicKey,
            user: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        toast.success("You have successfully donated");
        // window.reload()
      }
    } catch (err: any) {
      toast.success(err.message);
      console.log(err);
    } finally {
      setTransactionPending(false);
    }
  };

  const getTransactions = async () => {
    const endpoint =
      "https://virulent-ultra-replica.solana-devnet.quiknode.pro/8d0f174b8b11b55aee43b27a6f913fff39963312/";
    const solanaConnection = new Connection(endpoint);

    if (smartContract && publicKey) {
      let transactionList = await solanaConnection?.getSignaturesForAddress(
        publicKey,
        { limit: 5 }
      );
      transactionList.forEach((transaction: any, i: number) => {
        const date = new Date(transaction.blockTime * 1000);
        console.log(`Transaction No: ${i + 1}`);
        console.log(`Signature: ${transaction.signature}`);
        console.log(`Time: ${date}`);
        console.log(`Status: ${transaction.confirmationStatus}`);
        console.log("-".repeat(20));
        console.log(transaction);
      });
    }
  };
  React.useEffect(() => {
    getUser();
    getTransactions();
  }, [publicKey]);

  return (
    <AppContext.Provider
      value={{
        user,
        transactionPending,
        step,
        setStep,
        smartContract,
        getUser,
        tags,
        setTags,
        bio,
        setBio,
        initialized,
        amount,
        setAmount,
        initUser,
        getAllCampaigns,
        campaigns,
        setCampaigns,
        getACampaign,
        recipient,
        donate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
