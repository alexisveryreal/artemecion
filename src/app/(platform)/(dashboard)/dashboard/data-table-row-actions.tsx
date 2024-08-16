"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("OS IS: ", os);
    console.log("Code is: ", e.code);
    if ((e.metaKey || e.ctrlKey) && e.code === "Backspace") {
      console.log("HELLO WORLD");
      // modal here
    }
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyE") {
      console.log("EDIT");
      router.push(`/edit-bill/${bill.id}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
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
            {(os === "Windows" || os === "Linux") && (
              <DropdownMenuShortcut>ctrl E</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
            {os === "MacOS" && <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>}
            {(os === "Windows" || os === "Linux") && (
              <DropdownMenuShortcut>ctrl⌫</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        open={open}
        name={bill.name}
        onOpenChange={setOpen}
        action={() => console.log("DELETE?")}
      />
    </>
  );
}
