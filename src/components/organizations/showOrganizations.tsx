import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";
import { getOrganizations } from "@/server/queries/client";
import OrganizationOptions from "@/components/organizations/organizationOptions";
import { cn } from "@/lib/utils";

interface ShowOrganizationsProps {
  userId: string;
}

const ShowOrganizations = ({ userId }: ShowOrganizationsProps) => {
  const { data: organizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations({ userId }),
  });

  if (!organizations) return null;

  return organizations.map((org) => (
    <div
      key={org.slug}
      className={cn(
        "group flex items-center gap-2 px-4",
        "animate-in fade-in slide-in-from-bottom-2 duration-200",
      )}
    >
      <SidebarLink href={`/home/${org.slug}`} title={org.name}>
        <p className="max-w-40 truncate">{org.name}</p>
      </SidebarLink>
      <OrganizationOptions organization={org} />
    </div>
  ));
};

export default ShowOrganizations;