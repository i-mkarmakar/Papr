"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { EllipsisIcon, XIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import EditCollection from "./editCollection";
import DeleteCollection from "./deleteCollection";
import type { GetCollections } from "@/server/db/types";
import { cn } from "@/lib/utils";

interface CollectionOptionsProps {
  collection: GetCollections;
}

const CollectionOptions = ({ collection }: CollectionOptionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        title="Collection Options"
        className={cn(
          buttonVariants({
            size: "icon",
          }),
          "h-7 cursor-pointer",
        )}
      >
        {isOpen ? <XIcon size={16} /> : <EllipsisIcon size={16} />}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <EditCollection
          collectionId={collection.id}
          title={collection.name}
          colors={collection.colors}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            <PencilLineIcon size={14} className="mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
        </EditCollection>
        <DropdownMenuSeparator />
        <DeleteCollection collectionId={collection.id} title={collection.name}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            <TrashIcon size={14} className="mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DeleteCollection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionOptions;