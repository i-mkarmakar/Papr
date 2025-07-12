import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";
import { getOrganizations } from "@/server/queries/client";
import OrganizationOptions from "@/components/organizations/organizationOptions";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface ShowOrganizationsProps {
  userId: string;
}

const ShowOrganizations = ({ userId }: ShowOrganizationsProps) => {
  const { data: organizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: () =>
      getOrganizations({
        userId,
      }),
  });

  if (!organizations) {
    return <Skeleton className="h-8 w-full" />;
  }

  return organizations.map((org) => (
    <div
      key={org.slug}
      className={cn(
        "group flex items-center gap-2 px-4",
        "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 duration-200",
      )}
    >
      <SidebarLink href={`/app/${org.slug}`} title={org.name}>
        <p className="max-w-40 truncate">{org.name}</p>
      </SidebarLink>
      <OrganizationOptions
        organization={org}
        className="group-hover:opacity-100"
      />
    </div>
  ));
};

export default ShowOrganizations;
