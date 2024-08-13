"use client";

import { z } from "zod";

import { useZodForm } from "@/hooks/use-zod-form";

export const billCreateSchema = z.object({
  name: z.string().min(1, "Name must have at least one character"),
  amount: z.coerce
    .number({
      invalid_type_error: "Please enter only numbers",
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be greater than 0"),
  type: z.enum(["OneTime", "Recurring"]),
  url: z.string().url("Please enter a valid url"),
  billDate: z.coerce.date(),
});

const CreateBillPage = () => {
  const form = useZodForm({
    schema: billCreateSchema,
    defaultValues: {
      amount: 0,
      billDate: new Date(),
      name: "",
      url: "",
      type: "Recurring",
    },
  });

  return (
    <div>
      <div>Edit Bill page</div>
    </div>
  );
};

export default CreateBillPage;
