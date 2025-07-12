"use client";

import { UserButton } from "@clerk/nextjs";
import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";

interface UserMenuProps {
  fullName?: string;
  emailAddresses?: string;
}

const UserMenu = ({ fullName, emailAddresses }: UserMenuProps) => {
  const userButtonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const button = userButtonRef.current?.querySelector("button");
    if (button) button.click();
  };

  return (
    <div
      className="flex max-w-xs cursor-pointer items-center space-x-2"
      onClick={handleClick}
    >
      <div className="flex items-center" ref={userButtonRef}>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex items-center space-x-2 overflow-hidden">
        <div className="flex max-w-[140px] flex-col space-y-0.5 overflow-hidden text-left">
          <p className="truncate text-sm leading-none font-medium text-zinc-800">
            {fullName}
          </p>
          <p className="truncate text-xs text-zinc-500">
            {emailAddresses}
          </p>
        </div>
        <ChevronDownIcon
          size={14}
          className="rounded-full bg-zinc-300 p-0.5 text-zinc-700"
        />
      </div>
    </div>
  );
};

export default UserMenu;
