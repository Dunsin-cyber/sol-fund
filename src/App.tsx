import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";
import { useWallet } from "@solana/wallet-adapter-react";
import MessagePage from "./pages/Message";

const App = () => {
  // const { initialized } = React.useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  React.useMemo(() => {
    if (publicKey === null) {
      if (location.pathname.includes("details/")) {
        return;
      } else {
        navigate("/", {
          state: location || "campaign",
        });
      }
    }
  }, [publicKey]);

  React.useEffect(() => {
    if (publicKey === null) {
      if (location.pathname.includes("details/")) {
        return;
      } else {
        navigate("/", {
          state: location || "campaign",
        });
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="onboarding" element={<Onboarding1 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="message" element={<MessagePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
