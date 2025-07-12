"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

interface ClerkCustomProviderProps {
  children: ReactNode;
}

const ClerkCustomProvider = ({ children }: ClerkCustomProviderProps) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          borderRadius: "none",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkCustomProvider;
