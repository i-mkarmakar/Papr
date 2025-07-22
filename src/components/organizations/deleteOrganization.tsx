import { useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOrganization } from "@/server/queries/organizations";
import { redirect } from "next/navigation";
import { LoaderIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteOrganizationProps {
  title: string;
  organizationId: string;
  children: ReactNode;
}

const DeleteOrganization = (props: DeleteOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteOrganization = async () => {
    setIsLoading(true);
    try {
      await deleteOrganization(props.organizationId);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      setIsOpen(false);
      setIsLoading(false);
      toast.success("Deleted organization successfully");
      redirect("/home");
    } catch (error) {
      console.error(
        "⚠️ deleteOrganization - Error deleting organization:",
        error,
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Organization</DialogTitle>
          <DialogDescription>
            This <strong>{props.title} organization</strong> and{" "}
            <strong>its collections</strong> will be deleted from your account.
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => handleDeleteOrganization()}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-red-500" />
            )}
            <span>{isLoading ? "Deleting..." : "Delete"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrganization;