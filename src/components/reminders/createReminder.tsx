import type { InsertReminder } from "@/server/db/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReminder } from "@/server/queries/reminders";
import { reminderZodSchema } from "@/server/schemas/reminder";
import {
  CalendarIcon,
  ChevronDown,
  CornerDownRightIcon,
  LoaderIcon,
  PlusIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CreateReminderProps {
  collectionName: string;
  collectionColor: string | null;
  collectionId: string;
}

const CreateReminder = ({
  collectionName,
  collectionColor,
  collectionId,
}: CreateReminderProps) => {
  const [openDueDate, setOpenDueDate] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<InsertReminder>({
    resolver: zodResolver(reminderZodSchema),
    defaultValues: {
      collectionId: collectionId,
    },
  });

  const handleCreateReminder = async (data: InsertReminder) => {
    setIsLoading(true);
    try {
      await insertReminder({
        ...data,
        collectionId: collectionId,
      });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success("Reminder created successfully");
    } catch (error) {
      console.error("⚠️ createReminder - Error creating reminder:", error);
      toast.error("Failed to create reminder", {
        description: "Please try again later.",
      });
      setIsLoading(false);
    }
  };

  const handleOnClose = (value: boolean) => {
    setIsOpen(value);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => handleOnClose(value)}>
      <DialogTrigger
        title="Add a new reminder"
        className={cn(
          buttonVariants({
            size: "icon",
          }),
          "h-7 cursor-pointer",
        )}
      >
        <PlusIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-1.5">
            {collectionColor && (
              <div
                className={cn(collectionColor, "h-4 w-4 rounded-full")}
              />
            )}
            <span>New Reminder</span>
          </DialogTitle>
          <DialogDescription className="flex items-center space-x-1.5">
            <CornerDownRightIcon className="h-4 w-4" />
            <span>{collectionName}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateReminder)}
            className="mt-2 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="What's your plan?"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Collapsible open={openDueDate} onOpenChange={setOpenDueDate}>
              <CollapsibleTrigger className="flex cursor-pointer items-center text-sm">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Due Date</span>
                </div>
                <ChevronDown
                  className={cn(
                    openDueDate ? "rotate-180" : "rotate-0",
                    "ml-2 h-4 w-4 transition-transform duration-200 ease-in-out",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col items-center justify-center">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <Calendar
                        initialFocus
                        className="mt-2 w-full p-0"
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer"
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" size={16} />
                ) : (
                  <PlusIcon className="h-4 w-4" />
                )}
                <span>{isLoading ? "Creating..." : "Create"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
