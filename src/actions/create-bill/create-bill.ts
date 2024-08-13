"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { type BillItem } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/server/db";

import { CreateBill } from "./schema";
import { type InputType, type ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { amount, billDate, name, type, url } = data;

  let bill: BillItem;

  try {
    bill = await db.billItem.create({
      data: {
        amount,
        billDate,
        name,
        type,
        url,
        userId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/dashboard`);
  return {
    data: bill,
  };
};

export const createBill = createSafeAction(CreateBill, handler);
