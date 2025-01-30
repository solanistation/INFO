"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  globalWalletAddress: string;
  setGlobalWalletAddress: (globalWalletAddress: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalWalletAddress, setGlobalWalletAddress] = useState("");

  return (
    <GlobalContext.Provider value={{ globalWalletAddress, setGlobalWalletAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return globalContext;
};