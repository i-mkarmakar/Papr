import { Button, buttonVariants } from "@/components/ui/button";
import { HouseIcon, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center space-x-2 px-4 py-3">
      <Button
        size="icon"
        title="Toggle Sidebar"
        onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
        className="cursor-pointer"
      >
        {props.sidebarOpen ? (
          <SidebarCloseIcon size={20} strokeWidth={1.5} />
        ) : (
          <SidebarOpenIcon size={20} strokeWidth={1.5} />
        )}
      </Button>
      {!props.sidebarOpen && (
        <Link
          href="/app"
          title="Home"
          className={buttonVariants({ size: "icon" })}
        >
          <HouseIcon size={20} strokeWidth={1.5} />
        </Link>
      )}
    </header>
  );
};

export default Header;
