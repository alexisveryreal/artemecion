"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteBillAction } from "@/actions/delete-bill";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOS } from "@/hooks/useOS";

import { DeleteDialog } from "./delete-dialog";
import { billSchema } from "./schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const bill = billSchema.parse(row.original);
  const router = useRouter();
  const os = useOS();
  const [open, setOpen] = useState(false);

  const { execute, isPending } = useAction(deleteBillAction, {
    onSuccess() {
      toast.success("Success", {
        description: "Successfully deleted bill",
      });
    },
    onError(err) {
      toast.error("An error has occured", {
        description: "lmao",
      });
      console.log(err.error);
    },
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "Backspace") {
      setOpen(true);
    }

    if (os === "MacOS" && e.metaKey && e.code === "KeyE") {
      router.push(`/edit-bill/${bill.id}`);
    } else if (
      os === "Windows" &&
      e.ctrlKey &&
      e.shiftKey &&
      e.code === "KeyE"
    ) {
      router.push(`/edit-bill/${bill.id}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onKeyDown={onKeyDown}
        >
          <DropdownMenuItem
            onClick={() => router.push(`/edit-bill/${bill.id}`)}
          >
            Edit
            {os === "MacOS" && <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>}
            {os === "Windows" && (
              <DropdownMenuShortcut>ctrl ↑ E</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem disabled={isPending} onClick={() => setOpen(true)}>
            Delete
            {os === "MacOS" && <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>}
            {os === "Windows" && (
              <DropdownMenuShortcut>ctrl⌫</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        open={open}
        name={bill.name}
        onOpenChange={setOpen}
        action={() => execute({ id: bill.id })}
      />
    </>
  );
}
