import { z } from "zod";

export const DeleteBill = z.object({
  id: z.string(),
});
