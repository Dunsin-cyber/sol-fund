import React from "react";
import { useToast } from "@chakra-ui/react";
import { AppContext } from "../../Context";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../../idl.json";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetUser = async () => {
  const { smartContract } = React.useContext(AppContext);
  const { publicKey } = useWallet();
  const [user, setUser] = React.useState(false);
  const navigate = useNavigate();

  try {
    if (smartContract && publicKey) {
      const [CampaignPda] = findProgramAddressSync(
        [utf8.encode("COMPAIGN_DEMO"), publicKey.toBuffer()],
        smartContract.programId
      );
      const user = await smartContract.account.campaign.fetch(CampaignPda);
      console.log("user", user);
    }
  } catch (err) {
    if (err) {
      toast.success("You do not have an account, create one");
      navigate("onboarding");
      return;
    }
    // toast.error("Error Getting user status")
    // console.log(err)
  }
};
