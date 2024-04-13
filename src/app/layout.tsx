import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import AppState from "../../context/appState";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IMS | Inventoey management App",
  description: "It is India's no1 Inventory management application system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppState>

        {children}
        </AppState>
        </body>
    </html>
  );
}
