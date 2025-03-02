"use client"; // This makes it a client-only component

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { shadesOfPurple } from "@clerk/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function ClientWrapper({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple, // Clerk theme
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className={inter.className}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}