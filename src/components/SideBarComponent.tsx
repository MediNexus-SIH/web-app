"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface SideBarComponentProps {
  path: string;
  icon: ReactNode;
  title: string;
}

export const SideBarComponent: React.FC<SideBarComponentProps> = ({
  path,
  icon,
  title,
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(path);
      }}
      className="group flex items-center justify-center group-hover:justify-start w-full transition-all duration-500 ease-in-out hover:bg-muted/40 rounded-lg h-10 overflow-hidden"
    >
      <div className="flex items-center justify-center w-10 h-10 transition-all duration-500 ease-in-out group-hover:mr-2">
        {React.cloneElement(icon as React.ReactElement, {
          className:
            "h-5 w-5 transition-all duration-500 ease-in-out group-hover:scale-110",
        })}
      </div>
      <span className="opacity-0 w-0 text-sm transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:w-auto whitespace-nowrap overflow-hidden">
        {title}
      </span>
    </button>
  );
};
