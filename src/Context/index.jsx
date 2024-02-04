import React from "react";

export const AppContext = React.createContext()

export const AppProvider = ({ children } ) => {
  const [step, setStep] = React.useState(1);

  return (
    <AppContext.Provider value={{ step, setStep }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
