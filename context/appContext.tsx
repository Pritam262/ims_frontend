'use client'
import { createContext, ReactNode, useContext, useState, useEffect, SetStateAction, Dispatch } from "react";

import { razor_pay_api_key, SERVERIP } from "../variable"
type AppContextType = {
  serverIp: String;
  RAZORPAY_API_KEY: string;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>; // Corrected type for setIsLogin
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


  const serverIp = SERVERIP;

  const [isLogin, setIsLogin] = useState(false);



  const RAZORPAY_API_KEY = razor_pay_api_key; // <Your RAZORPAY_API_KEY>


  const getUser = async () => {
    try {
      const response = await fetch(`${serverIp}/api/auth/getuser`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setIsLogin(true);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {

    }
  }


  // useEffect(()=>{
  //   getUser()
  // },[])

  // useEffect(() => {
  //   getUser();
  
  // }, [isLogin])

const contextValue: AppContextType = {

  serverIp,
  RAZORPAY_API_KEY,
  isLogin,
  setIsLogin,
};

return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
