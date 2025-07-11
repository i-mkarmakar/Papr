"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

interface ClerkCustomProviderProps {
  children: ReactNode;
}

const ClerkCustomProvider = ({ children }: ClerkCustomProviderProps) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
};

export default ClerkCustomProvider;
