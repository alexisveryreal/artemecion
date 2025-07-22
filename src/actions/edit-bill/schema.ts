import { type Prisma } from "@prisma/client";
import { z } from "zod";

export const EditBill = z.object({
  name: z.string({}).min(1, "Name must have at least one character").optional(),
  amount: z
    .number({
      error: "Please enter an amount",
    })
    .min(1, "Amount must be greater than 0")
    .optional(),
  type: z.enum(["OneTime", "Recurring"]).optional(),
  url: z.url("Please enter a valid url").optional(),
  billDate: z.date().optional(),
  id: z.string(),
}) satisfies z.Schema<Prisma.BillItemUpdateInput>;
