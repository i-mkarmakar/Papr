"use client";

import { useState, useRef } from "react";
import { UserButton } from "@clerk/nextjs";
import { ChevronDownIcon } from "lucide-react";

interface UserMenuProps {
  fullName?: string;
  emailAddresses?: string;
}

const UserMenu = ({ fullName, emailAddresses }: UserMenuProps) => {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const button = userButtonRef.current?.querySelector("button");
    if (button) {
      button.click();
      setIsOpen(!isOpen);
    }
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
        <div className="flex max-w-[140px] flex-col overflow-hidden text-left">
          <p className="truncate text-sm leading-none font-medium text-zinc-800">
            {fullName}
          </p>
          <p className="truncate text-xs text-zinc-500">{emailAddresses}</p>
        </div>
        <ChevronDownIcon
          className={`size-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>
    </div>
  );
};

export default UserMenu;