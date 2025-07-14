import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-border selection:bg-main selection:text-main-foreground font-base text-foreground file:font-heading placeholder:text-foreground/50 flex h-10 w-full rounded-none border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };