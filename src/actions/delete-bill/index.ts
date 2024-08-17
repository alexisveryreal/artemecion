"use server";

import { revalidatePath } from "next/cache";

import { authenticatedAction } from "@/lib/safe-action";
import { db } from "@/server/db";

import { DeleteBill } from "./schema";

export const deleteBillAction = authenticatedAction
  .createServerAction()
  .input(DeleteBill)
  .handler(async ({ input: { id }, ctx: { userId } }) => {
    await db.billItem.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/dashboard");
  });
