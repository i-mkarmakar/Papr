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
import { deleteCollection } from "@/server/queries/collections";
import { LoaderIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteCollectionProps {
  title: string;
  collectionId: string;
  children: ReactNode;
  onDelete?: () => void;
}

const DeleteCollection = (props: DeleteCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteCollection = async () => {
    setIsLoading(true);
    try {
      await deleteCollection(props.collectionId);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      toast.success("Collection deleted successfully");
      setIsOpen(false);
      props.onDelete?.();
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Failed to delete collection", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Collection</DialogTitle>
          <DialogDescription>
            This <strong>{props.title} collection</strong> and{" "}
            <strong>its reminders</strong> will be deleted from your account.
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDeleteCollection}
            className="cursor-pointer"
            disabled={isLoading}
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

export default DeleteCollection;