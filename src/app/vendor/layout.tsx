import "../globals.css";
import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter as FontSans, Manrope } from "next/font/google";

import StickySideBar2 from "./components/StickySideBar";
import TopBar from "@/components/TopBar";
export const metadata: Metadata = {
  title: "MediNexus",
  description: "Streamline Your Hospital Supply Chain",
};

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "flex flex-col antialiased",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <div className="min-h-screen">
          <div className="flex-1 flex flex-col">
            <TopBar className="w-full" />
            <div className="flex ">
              <StickySideBar2 className="" />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
