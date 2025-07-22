"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

const SidebarLinkStyle = cn(
  "cursor-pointer flex w-full items-center space-x-2",
  "px-4 py-2 text-sm",
  "transition-colors duration-200 ease-in-out",
);

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <Link title={props.title} href={props.href} className={SidebarLinkStyle}>
      {props.children}
    </Link>
  );
};

export { SidebarLink, SidebarLinkStyle };