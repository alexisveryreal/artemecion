"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authActionClient } from "@/lib/safe-action";
import { db } from "@/server/db";

import { CreateBill } from "./schema";

export const createBillAction = authActionClient
  .inputSchema(CreateBill)
  .action(
    async ({
      parsedInput: { amount, billDate, name, type, url },
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
