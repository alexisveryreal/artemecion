"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authActionClient } from "@/lib/safe-action";
import { db } from "@/server/db";

import { EditBill } from "./schema";

export const editBillAction = authActionClient
  .inputSchema(EditBill)
  .action(
    async ({
      parsedInput: { amount, billDate, name, type, url, id },
      ctx: { userId },
    }) => {
      const updated = await db.billItem.update({
        data: {
          amount,
          billDate,
          name,
          type,
          url,
        },
        where: {
          id,
          userId,
        },
      });

      revalidatePath(`/edit-bill/${updated.id}`);
      redirect("/dashboard");
    },
  );
