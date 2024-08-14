import { z } from "zod";

import type { BillItem } from "@prisma/client";

// used for row actions
const billSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  type: z.enum(["OneTime", "Recurring"]),
  userId: z.string(),
  url: z.string().url(),
  billDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.Schema<BillItem>;

export { billSchema };
