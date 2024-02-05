import React from "react";
import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

export const AppContext = React.createContext<{
  step: number;
  setStep: any;
  smartContract: any;
  user: any;
  transactionPending: any;
  getUser: any;
  tags: any;
  setTags: any;
  bio: any;
  setBio: any;
  initialized:any
}>({
  step: 1,
  setStep: undefined,
  smartContract: undefined,
  user: undefined,
  transactionPending: undefined,
  getUser: undefined,
  tags: undefined,
  setTags: undefined,
  bio: undefined,
  setBio: undefined,
  initialized:undefined
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
  const [amount, setAmount] = React.useState(0);
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [user, setUser] = React.useState(false);
  const { publicKey } = useWallet();
console.log(publicKey)
  const smartContract = React.useMemo(() => {
    console.log("i ran")
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
      console.log("starter")
      if (smartContract && publicKey) {
        const [CampaignPda] = findProgramAddressSync(
          [utf8.encode("COMPAIGN_DEMO"), publicKey.toBuffer()],
          smartContract.programId
        );

        const data = await smartContract.account.campaign.fetch(CampaignPda);

        if (data) {
          setUser(true);
        }
        setTransactionPending(false);
        return;
      }
    } catch (err) {
      console.log("error bloock")
      console.log(err);
    
    }
  };

  // React.useEffect(() => {
  //   const start = async () => {
  //     if (smartContract && publicKey) {
  //       try {
  //         const [userPda] = await findProgramAddressSync(
  //           [utf8.encode("user"), publicKey.toBuffer()],
  //           smartContract.programId
  //         );
  //         const user = await smartContract.account.userAccount.fetch(userPda);
  //         if (user) {
  //           setInitialized(true);
  //           console.log("USER", user);
  //           // setUser(user)
  //           // const postAccounts = await smaartContract.account.postAccount.all(publicKey.toString())
  //           // setPosts(postAccounts)
  //         }
  //       } catch (error) {
  //         console.log("error", error);
  //         setInitialized(false);
  //       }
  //     }
  //   };
  //   start();
  // }, [smartContract, publicKey, transactionPending]);

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
        initialized
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
