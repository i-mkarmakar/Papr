"use client";

import { useState, type ReactNode } from "react";
import type { InsertOrganization } from "@/server/db/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrganization } from "@/server/queries/organizations";
import { organizationZodSchema } from "@/server/schemas/organization";
import { toast } from "sonner";

interface CreateOrganizationProps {
  children: ReactNode;
}

const CreateOrganization = (props: CreateOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(organizationZodSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateOrganization = async (data: InsertOrganization) => {
    try {
      setIsLoading(true);
      await insertOrganization(data);
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
      form.reset();
      setIsOpen(false);
      toast.success("Organization created successfully");
    } catch (error: unknown) {
      console.error("⚠️ createOrganization - Error:", error);

      let isDuplicate = false;

      if (typeof error === "object" && error !== null) {
        const err = error as {
          code?: string;
          message?: string;
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        if (
          err.code === "23505" ||
          err.message?.includes("duplicate key") ||
          err.response?.data?.message?.includes("already exists")
        ) {
          isDuplicate = true;
        }
      }

      toast.error(
        isDuplicate ? "Duplicate Organization" : "Failed to create organization",
        {
          description: isDuplicate
            ? "An organization with this name already exists."
            : "Please try again later.",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to manage your collections and reminders.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateOrganization)}
            className="my-2 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer"
              >
                {isLoading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusIcon className="h-4 w-4" />
                )}
                <span>{isLoading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganization;