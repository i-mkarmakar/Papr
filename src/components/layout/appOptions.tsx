import type { ReactNode } from "react";
import { container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface AppOptionsProps {
  title?: string;
  children: ReactNode;
}

const AppOptions = (props: AppOptionsProps) => {
  return (
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
        <h2 className="text-xl font-semibold">{props.title ?? "Home"}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default AppOptions;