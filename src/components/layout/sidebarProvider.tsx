"use client";

import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import SidebarClient from "@/components/layout/sidebar";
import SidebarContent from "@/components/layout/sidebarContent";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;
    setIsOpen(!isSmallScreen);
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <SidebarClient isOpen={isOpen}>
      <SidebarContent isOpen={isOpen} />
      <button
        title="Toggle Sidebar"
        className={cn(
          "absolute left-0 z-50 h-screen w-1",
          "transition-colors duration-200 ease-in-out",
          "cursor-w-resize",
        )}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Header sidebarOpen={isOpen} setSidebarOpen={setIsOpen} />
      {children}
    </SidebarClient>
  );
};

export default SidebarProvider;