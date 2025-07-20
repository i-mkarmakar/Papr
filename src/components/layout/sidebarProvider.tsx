"use client";

import { useState, type ReactNode } from "react";
import SidebarClient from "@/components/layout/sidebar";
import SidebarContent from "@/components/layout/sidebarContent";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen] = useState<boolean>(true);

  return (
    <SidebarClient isOpen={isOpen}>
      <SidebarContent isOpen={isOpen} />
      {children}
    </SidebarClient>
  );
};

export default SidebarProvider;
