import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const ExternalLink = (props: ComponentProps<"a">) => {
  return (
    <a
      href={props.href}
      title={props.title}
      rel="noreferrer"
      target="_blank"
      className={cn(props.className)}
    >
      {props.children}
    </a>
  );
};

export { ExternalLink };
