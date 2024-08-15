"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { db } from "@/server/db";

import { CreateBill } from "./schema";

export const createBillAction = authenticatedAction
  .createServerAction()
  .input(CreateBill)
  .handler(
    async ({
      input: { amount, billDate, name, type, url },
      ctx: { userId },
    }) => {
      await db.billItem.create({
        data: {
          amount,
          billDate,
          name,
          type,
          url,
          userId,
        },
      });

      revalidatePath("/dashboard");
      redirect("/dashboard");
    },
  );
