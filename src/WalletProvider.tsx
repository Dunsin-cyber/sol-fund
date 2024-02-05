import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const WalletConnetProvider = ({ children }: any) => {
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => {
  //   if (network === WalletAdapterNetwork.Devnet) {
  //     return "https://holy-indulgent-rain.solana-devnet.quiknode.pro/48da34f302f5276f48b3e6c9b5ff5296442ed154/";
  //   }
  //   return clusterApiUrl(network);
  // }, [network]);

  // const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnetProvider;
