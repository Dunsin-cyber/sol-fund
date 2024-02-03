import React from "react";

export const AppContext = React.createContext<{
  step: number;
  setStep: any;
}>({
  step: 1,
  setStep: undefined,
});

export const AppProvider = ({ children }) => {
  const [step, setStep] = React.useState<number>(1);

  return (
    <AppContext.Provider value={{ step, setStep }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
