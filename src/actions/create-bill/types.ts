import { type z } from "zod";

import type { BillItem } from "@prisma/client";
import { type ActionState } from "@/lib/create-safe-action";

import { type CreateBill } from "./schema";

export type InputType = z.infer<typeof CreateBill>;

export type ReturnType = ActionState<InputType, BillItem>;
