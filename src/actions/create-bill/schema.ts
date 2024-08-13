import { type Prisma } from "@prisma/client";
import { z } from "zod";

export const CreateBill = z.object({
  name: z.string({}).min(1, "Name must have at least one character"),
  amount: z.coerce
    .number({
      invalid_type_error: "Please enter only numbers",
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be greater than 0"),
  type: z.enum(["OneTime", "Recurring"]),
  url: z.string().url("Please enter a valid url"),
  billDate: z.coerce.date(),
  userId: z.string(),
}) satisfies z.Schema<Prisma.BillItemCreateInput>;
