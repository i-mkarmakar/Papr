import type { Metadata } from "next";
import type { ReactNode } from "react";
import { appConfig } from "@/config";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontOnest, fontSans } from "@/fonts";

import QueryProvider from "@/providers/queryProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import ClerkCustomProvider from "@/providers/clerkProvider";
import CreditsFooter from "@/components/credits";

export const metadata: Metadata = {
  description: appConfig.description,
  metadataBase: new URL(appConfig.prodUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${appConfig.title} - ${appConfig.description}`,
    template: `%s - ${appConfig.title}`,
  },
  icons: [
    { rel: "icon", url: "/logo_ico.ico" },
    { rel: "icon", url: "/logo_svg.svg", type: "image/svg+xml" },
  ],
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
          "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkCustomProvider>
            <QueryProvider>{children}</QueryProvider>
            <CreditsFooter />
          </ClerkCustomProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
