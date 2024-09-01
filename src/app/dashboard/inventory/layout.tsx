import React from "react";
import Head from "next/head";
import { ReactNode } from "react";
import Link from "next/link";
import SearchInputField from "@/components/SearchInputField";
import DropdownMenuProfile from "@/components/DropdrownMenuProfile";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Your App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-5 border-b-2 mb-2 ">
        <ul className="flex justify-between">
          <Link href="/dashboard">MediNexus</Link>
          <div className="flex space-x-4 ">
            <SearchInputField />
            <DropdownMenuProfile />
          </div>
        </ul>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
