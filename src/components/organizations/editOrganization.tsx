import type { InsertOrganization } from "@/server/db/types";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PencilLineIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateOrganization } from "@/server/queries/organizations";
import { organizationZodSchema } from "@/server/schemas/organization";
import { toast } from "sonner";

interface EditOrganizationProps {
  title: string;
  organizationId: string;
  children: ReactNode;
}

const EditOrganization = (props: EditOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(organizationZodSchema),
    defaultValues: {
      name: props.title,
    },
  });

  const handleUpdateOrganization = async (data: InsertOrganization) => {
    setIsLoading(true);
    try {
      await updateOrganization(props.organizationId, data);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      form.reset();
      setIsOpen(false);
      toast.success("Organization created successfully");
    } catch (error) {
      console.error(
        "⚠️ updateOrganization - Error updating organization:",
        error,
      );
      toast.error("Failed to update organization", {
        description: "Please try again later.",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>{props.title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateOrganization)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name:</FormLabel>
                  <FormControl>
                    <Input placeholder={props.title} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {isLoading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <PencilLineIcon className="h-4 w-4" />
                )}
                <span>{isLoading ? "Editing..." : "Edit"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganization;
