import React, { useMemo } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const App = () => {
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <React.Fragment>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="onboarding" element={<Onboarding1 />} />
              <Route path="profile" element={<Profile />} />
              <Route path="campaign" element={<Campaign />} />
              <Route path="details" element={<Details />} />
            </Routes>
          </Router>
        </React.Fragment>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
