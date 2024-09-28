"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export const LogOutButton = () => {
  const router = useRouter();
  return (
    <button
      className="w-full text-left"
      onClick={() => {
        signOut();
        router.push("/auth/signin");
      }}
    >
      Logout
    </button>
  );
};
