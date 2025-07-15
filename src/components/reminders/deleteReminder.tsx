import { useState } from "react";
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
import { LoaderIcon, TrashIcon } from "lucide-react";
import { deleteReminder } from "@/server/queries/reminders";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DeleteReminderProps {
  title: string;
  reminderId: string;
  className?: string;
}

const DeleteReminder = (props: DeleteReminderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteReminder = async () => {
    setIsLoading(true);
    try {
      await deleteReminder(props.reminderId);
      setIsOpen(false);
      setIsLoading(false);
      toast.success("Deleted reminder successfully");
    } catch (error) {
      console.error("⚠️ DeleteReminder - Error deleting reminder:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        title="Delete reminder"
        className={cn(
          "hover:text-zinc-900",
          "transition-colors duration-100 ease-in-out",
          props.className,
        )}
      >
        <TrashIcon className="h-4 w-4 text-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Reminder</DialogTitle>
          <DialogDescription>
            This <strong>{props.title}</strong> reminder will be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => handleDeleteReminder()}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <TrashIcon className="h-4 w-4 text-red-500" />
            )}
            <span>{isLoading ? "Deleting..." : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReminder;
