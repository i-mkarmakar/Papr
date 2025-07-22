"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FolderPlusIcon, HouseIcon, Building } from "lucide-react";
import UserMenu from "@/components/auth/userMenu";
import { SidebarLink, SidebarLinkStyle } from "@/components/layout/sidebarLink";
import { Separator } from "@/components/ui/separator";
import ShowOrganizations from "@/components/organizations/showOrganizations";
import CreateOrganization from "@/components/organizations/createOrganization";
import Image from "next/image";

interface SidebarContentProps {
  isOpen: boolean;
}

const SidebarContent = ({ isOpen }: SidebarContentProps) => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-60",
        "overflow-x-hidden overflow-y-auto",
        "border-r-2",
        "transition-all duration-300 ease-in-out",
        "select-none",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <nav
        className={cn(
          "flex h-full flex-col",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-1">
          <div className="flex w-full flex-col">
            <Link
              href="/home"
              className="flex items-center gap-2 p-4 text-xl font-medium"
            >
              <Image src="/logo.png" alt="App Logo" width={100} height={32} />
            </Link>
            <Separator className="border" />

            <nav className="flex flex-col">
              <SidebarLink href="/home">
                <div className="flex items-center gap-2 px-4 py-2">
                  <HouseIcon className="h-4 w-4" />
                  <span className="font-semibold">Home</span>
                </div>
              </SidebarLink>

              <Separator className="border" />

              {isLoaded && isSignedIn && user && (
                <CreateOrganization>
                  <button className={cn(SidebarLinkStyle)}>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <FolderPlusIcon className="h-4 w-4" />
                      <span className="font-semibold">Create Organization</span>
                    </div>
                  </button>
                </CreateOrganization>
              )}

              {isLoaded && isSignedIn && user && (
                <>
                  <Separator className="border" />
                  <div className="flex items-center gap-2 px-4 py-4">
                    <Building className="h-4 w-4" />
                    <span className="font-semibold">Organizations</span>
                  </div>
                  <ShowOrganizations userId={user.id} />
                </>
              )}
            </nav>
          </div>
        </div>

        <Separator className="border" />
        <div className="flex flex-col">
          <div className={cn("overflow-hidden p-4")}>
            <UserMenu
              fullName={user?.fullName ?? user?.username ?? ""}
              emailAddresses={user?.emailAddresses?.[0]?.emailAddress}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarContent;
