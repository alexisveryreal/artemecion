"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { db } from "@/server/db";

import { EditBill } from "./schema";

export const editBillAction = authenticatedAction
  .createServerAction()
  .input(EditBill)
  .handler(
    async ({
      input: { amount, billDate, name, type, url, id },
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
