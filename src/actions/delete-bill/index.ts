"use server";

import { revalidatePath } from "next/cache";

import { authActionClient } from "@/lib/safe-action";
import { db } from "@/server/db";

import { DeleteBill } from "./schema";

export const deleteBillAction = authActionClient
  .inputSchema(DeleteBill)
  .action(async ({ parsedInput: { id }, ctx: { userId } }) => {
    await db.billItem.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/dashboard");
  });
