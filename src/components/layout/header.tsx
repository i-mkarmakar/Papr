"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { container } from "@/components/ui/container";

interface HeaderProps {
  title?: string;
  children?: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({
  title = "Home",
  children,
}: HeaderProps) => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b-2 shadow-sm">
      <div
        className={cn(
          "z-40 w-full py-3",
          "flex w-full flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0",
          "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 delay-0 duration-500",
        )}
      >
        <div
          className={cn(container, "flex w-full items-center justify-between")}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <div className="flex items-center gap-3">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
