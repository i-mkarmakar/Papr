"use client";

import { useState, type ReactNode } from "react";
import SidebarClient from "@/components/layout/sidebar";
import SidebarContent from "@/components/layout/sidebarContent";
import { cn } from "@/lib/utils";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <SidebarClient isOpen={isOpen}>
      <SidebarContent isOpen={isOpen} />
      <button
        title="Toggle Sidebar"
        className={cn(
          "absolute left-0 z-50 h-screen w-1",
          "hover:bg-zinc-400 dark:hover:bg-zinc-600",
          "transition-colors duration-200 ease-in-out",
          "cursor-w-resize",
        )}
        onClick={() => setIsOpen(!isOpen)}
      />
      {children}
    </SidebarClient>
  );
};

export default SidebarProvider;
