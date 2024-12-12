"use client"

import { cn } from "@/lib/utils"
import React from "react"

export function Sidebar({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-900",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return <div className="relative flex h-screen">{children}</div>
}

export function SidebarTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const Component = asChild ? React.Fragment : "button"

  return (
    <Component className="p-2 rounded-md dark:hover:bg-gray-700">
      {children}
    </Component>
  )
}

export function SidebarContent({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-y-auto bg-gray-50 dark:bg-gray-900 flex flex-col flex-grow w-full shadow-md",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-4", className)}>{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-2 p-4">{children}</div>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center space-x-2">{children}</div>
}

export function SidebarMenuButton({
  children,
  asChild = false,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const Component = asChild ? React.Fragment : "button"

  return (
    <Component className="w-full text-left text-sm text-gray-900 dark:text-white">
      {children}
    </Component>
  )
}
