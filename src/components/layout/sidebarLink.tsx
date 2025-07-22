"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

const SidebarLinkStyle = cn(
  "cursor-pointer flex w-full items-center space-x-2",
  "px-4 py-1.5 text-sm",
  "hover:bg-zinc-200",
  "transition-colors duration-200 ease-in-out",
);

const SidebarLink = (props: SidebarLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      title={props.title}
      href={props.href}
      className={cn(
        SidebarLinkStyle,
        pathname === props.href && "bg-zinc-200",
      )}
    >
      {props.children}
    </Link>
  );
};

export { SidebarLink, SidebarLinkStyle };
