import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
}

const SidebarClient = ({ isOpen, children }: SidebarProps) => {
  return (
    <div className={cn("relative flex h-screen")}>
      <div
        className={cn(
          "relative w-screen overflow-y-auto",
          "transition-all duration-300 ease-in-out",
          isOpen ? "ml-60" : "ml-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarClient;
