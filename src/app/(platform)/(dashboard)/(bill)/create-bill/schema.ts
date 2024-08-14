import { z } from "zod";

import type { Prisma } from "@prisma/client";

// used for bill form
const createBillSchema = z.object({
  name: z.string(),
  amount: z.coerce.number(),
  type: z.enum(["OneTime", "Recurring"]),
  userId: z.string(),
  url: z.string().url(),
  billDate: z.date(),
}) satisfies z.Schema<Prisma.BillItemCreateInput>;

export { createBillSchema };
