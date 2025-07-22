import { type Prisma } from "@prisma/client";
import { z } from "zod";

export const CreateBill = z.object({
  name: z.string({}).min(1, "Name must have at least one character"),
  amount: z.coerce
    .number({
      error: "Please enter only numbers",
    })
    .min(1, "Amount must be greater than 0"),
  type: z.enum(["OneTime", "Recurring"]),
  url: z.url("Please enter a valid url"),
  billDate: z.date(),
}) satisfies z.Schema<Omit<Prisma.BillItemCreateInput, "userId">>;
