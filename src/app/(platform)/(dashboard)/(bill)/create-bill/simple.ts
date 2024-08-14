"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { type ZodFormattedError } from "zod";

import { db } from "@/server/db";

import { createBillSchema } from "./schema";

export type FormState = {
  message: string;
  fields?: ZodFormattedError<typeof createBillSchema>;
  issues?: string[];
};

export const onSubmitAction = async (
  prevState: FormState,
  data: FormData,
): Promise<FormState> => {
  const { userId } = auth();

  if (!userId) {
    return {
      message: "Unauthorized",
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = createBillSchema.safeParse(formData);

  if (!parsed.success) {
    const fields = parsed.error.format();

    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { amount, billDate, name, type, url } = parsed.data;

  try {
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
  } catch (error) {
    return {
      message: "Failed to create.",
    };
  }

  revalidatePath("/dashboard");
  return {
    message: "bill created",
  };
};
