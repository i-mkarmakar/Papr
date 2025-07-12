"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FolderPlusIcon, HouseIcon, Building } from "lucide-react";

import UserMenu from "@/components/auth/userMenu";
import { SidebarLink, SidebarLinkStyle } from "@/components/layout/sidebarLink";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import ShowOrganizations from "@/components/organizations/showOrganizations";
import CreateOrganization from "@/components/organizations/createOrganization";

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
        "border-r-4",
        "transition-all duration-300 ease-in-out",
        "select-none",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <nav
        className={cn(
          "flex h-full flex-col pt-6 pb-2",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-1">
          <div className="flex w-full flex-col">
            <Link href="/app" className="px-4 pb-2 text-xl font-medium">
              Papr
            </Link>
            <Separator className="border-3" />

            <nav className="flex flex-col">
              <SidebarLink href="/app">
                <div className="flex items-center gap-2 px-4 py-2">
                  <HouseIcon size={20} />
                  <span>Home</span>
                </div>
              </SidebarLink>

              <Separator className="border-2" />
              {!isLoaded ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                isSignedIn &&
                user && (
                  <CreateOrganization>
                    <button className={cn(SidebarLinkStyle)}>
                      <div className="flex items-center gap-2 px-4 py-2">
                        <FolderPlusIcon size={20} />
                        <span>Create Organization</span>
                      </div>
                    </button>
                  </CreateOrganization>
                )
              )}
              {!isLoaded ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                isSignedIn &&
                user && (
                  <>
                    <Separator className="border-2" />
                    <div className="flex items-center gap-2 px-4 py-4">
                      <Building size={20} />
                      <span>Organizations</span>
                    </div>
                    <ShowOrganizations userId={user.id} />
                  </>
                )
              )}
            </nav>
          </div>
        </div>

        <section>
          <Separator className="border-2" />
          <div className="flex flex-col">
            <div className={cn("overflow-hidden p-4")}>
              <UserMenu
                fullName={user?.fullName ?? user?.username ?? ""}
                emailAddresses={user?.emailAddresses?.[0]?.emailAddress}
              />
            </div>
          </div>
        </section>
      </nav>
    </aside>
  );
};

export default SidebarContent;
