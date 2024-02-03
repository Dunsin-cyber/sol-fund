import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="onboarding" element={<Onboarding1 />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
