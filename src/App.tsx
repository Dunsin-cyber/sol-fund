import React, { useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!publicKey) {
      navigate("/");
    }
  }, []);
  if (publicKey) {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="onboarding" element={<Onboarding1 />} />
          <Route path="profile" element={<Profile />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="details" element={<Details />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </React.Fragment>
    );
  }
};

export default App;
