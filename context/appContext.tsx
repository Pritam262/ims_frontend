'use client'
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { razor_pay_api_key } from "../variable"
type AppContextType = {
  serverIp: String;
  RAZORPAY_API_KEY: string;
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


  const serverIp = "http://192.168.50.14:3000";

  const RAZORPAY_API_KEY = razor_pay_api_key; // <Your RAZORPAY_API_KEY>


  const contextValue: AppContextType = {

    serverIp,
    RAZORPAY_API_KEY,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
