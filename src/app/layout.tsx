import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontOnest, fontSans } from "@/fonts";
import QueryProvider from "@/providers/queryProvider";
import ClerkCustomProvider from "@/providers/clerkProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Papr - Remember Everything, Focus on What Matters.",
  description:
    "Create organizations, group tasks into collections, and set reminders with ease — all inside a clean, distraction-free interface.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontOnest.variable}`,
          "font-sans antialiased",
        )}
      >
        <ClerkCustomProvider>
          <Analytics />
          <SpeedInsights />
          <QueryProvider>{children}</QueryProvider>
        </ClerkCustomProvider>
        <Toaster richColors position="bottom-right" closeButton />
      </body>
    </html>
  );
}
