'use client'
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

type AppContextType = {
  serverIp:String;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {


  const serverIp = "http://192.168.50.14:3000"


  const contextValue: AppContextType = {

    serverIp,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
