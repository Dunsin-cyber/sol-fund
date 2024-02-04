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
}>({
  step: 1,
  setStep: undefined,
});

export const AppProvider = ({ children }: any) => {
  const [step, setStep] = React.useState<number>(1);
  const [transactionPending, setTransactionPending] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  console.log(publicKey);

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

  React.useEffect(() => {
    const start = async () => {
      if (smartContract && publicKey) {
        try {
          const [userPda] = await findProgramAddressSync(
            [utf8.encode("user"), publicKey.toBuffer()],
            smartContract.programId
          );
          const user = await smartContract.account.userAccount.fetch(userPda);
          if (user) {
            setInitialized(true);
            console.log("USER", user);
            // setUser(user)
            // const postAccounts = await smaartContract.account.postAccount.all(publicKey.toString())
            // setPosts(postAccounts)
          }
        } catch (error) {
          console.log("error", error);
          setInitialized(false);
        }
      }
    };
    start();
  }, [smartContract, publicKey, transactionPending]);

  return (
    <AppContext.Provider value={{ step, setStep }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
