import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontOnest, fontSans } from "@/fonts";
import QueryProvider from "@/providers/queryProvider";
import ClerkCustomProvider from "@/providers/clerkProvider";

export const metadata: Metadata = {
  title: "Papr - Remember Everything, Focus on What Matters.",
  description:
    "Create organizations, group tasks into collections, and set reminders with ease — all inside a clean, distraction-free interface.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${fontSans.variable} ${fontOnest.variable}`,
          "font-sans antialiased",
        )}
      >
        <ClerkCustomProvider>
          <QueryProvider>{children}</QueryProvider>
        </ClerkCustomProvider>
      </body>
    </html>
  );
}