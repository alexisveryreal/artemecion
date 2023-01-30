import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { useController } from "react-hook-form";
import { z } from "zod";
import { Form, useZodForm } from "../components/forms/Form";
import { FormInput } from "../components/forms/FormInput";
import { FormOptionGroup } from "../components/forms/FormOptionGroup";
import { FormSelect } from "../components/forms/FormSelect";
import { FormTextarea } from "../components/forms/FormTextarea";
import { SuccessModal } from "../components/SuccessModal";
import { Button } from "../components/ui/Button";
import type { Options } from "../components/ui/OptionGroup";
import { OptionGroup } from "../components/ui/OptionGroup";
import { api } from "../utils/api";
import { cn } from "../utils/cn";

// this schema is re-used in bill.router.ts
export const billCreateSchema = z.object({
  name: z.string().min(1, "Name must have at least one character"),
  description: z.string().nullable(),
  amount: z.coerce
    .number({
      invalid_type_error: "Please enter only numbers",
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be greater than 0"),
  type: z.enum(["OneTime", "Recurring"]),
  url: z.string().url("Please enter a valid url"),
  recurringType: z.enum(["Monthly", "Yearly", "Quaterly", "None"]),
  recurringDate: z.date().nullable(),
  oneTimeDate: z.date().nullable(),
});

const options: Options[] = [
  {
    name: "OneTime",
    description: "This is a one off bill",
  },
  {
    name: "Recurring",
    description: "This bill will happen every month, year, etc",
  },
];

const ReccuringMap: Record<
  z.infer<typeof billCreateSchema>["recurringType"],
  string
> = {
  Monthly: "Monthly",
  Quaterly: "Quaterly",
  Yearly: "Yearly",
  None: "None",
};

const CreateBillPage = () => {
  const form = useZodForm({
    schema: billCreateSchema,
    defaultValues: {
      type: "Recurring",
      recurringType: "None",
      recurringDate: null,
      oneTimeDate: null,
    },
  });

  const type = form.watch("type");
  const recurringType = form.watch("recurringType");

  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // const context = api.useContext()

  const { mutate: createBill, isLoading } = api.bill.create.useMutation({
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  return (
    <div className="min-h-screen py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900">
            Create Bill
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Form
              form={form}
              onSubmit={(data) => {
                console.log(data);
                createBill({
                  ...data,
                });
              }}
            >
              <div className="space-y-8 divide-y divide-zinc-200">
                <div className="space-y-8 divide-y divide-zinc-200">
                  <div>
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-zinc-900">
                        Bill Info
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        Please fill out as best as you can
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <FormInput
                          type="text"
                          label="Name"
                          required
                          {...form.register("name")}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <FormInput
                          type="text"
                          label="Amount"
                          required
                          {...form.register("amount")}
                        />
                        <p className="mt-2 text-sm text-zinc-500">
                          The amount of this specific bill
                        </p>
                      </div>
                      <div className="sm:col-span-6">
                        <FormTextarea
                          rows={3}
                          label="Description"
                          cornerHint="Optional"
                          {...form.register("description")}
                        />
                        <p className="mt-2 text-sm text-zinc-500">
                          Write anything about the bill here!
                        </p>
                      </div>
                      <div className="sm:col-span-6">
                        <FormOptionGroup
                          label="Bill Type"
                          name="type"
                          control={form.control}
                          options={options}
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <FormInput
                          type="text"
                          label="Site Url"
                          {...form.register("url")}
                        />
                        <p className="mt-2 text-sm text-zinc-500">
                          Please include https://
                        </p>
                      </div>
                      <div
                        className={cn(
                          type !== "Recurring" ? "hidden" : "block",
                          "sm:col-span-3"
                        )}
                      >
                        <FormSelect
                          label="Recurring Type"
                          {...form.register("recurringType")}
                        >
                          {billCreateSchema.shape.recurringType.options.map(
                            (op) => (
                              <option key={op} value={op}>
                                {ReccuringMap[op]}
                              </option>
                            )
                          )}
                        </FormSelect>
                      </div>
                      <div
                        className={cn(
                          recurringType === "None" || type === "OneTime"
                            ? "hidden"
                            : "block",
                          "sm:col-span-3"
                        )}
                      >
                        <FormInput
                          type="datetime-local"
                          label="Recurring Date"
                          {...form.register("recurringDate", {
                            valueAsDate: true,
                          })}
                        />

                        <p className="mt-2 text-sm text-zinc-500">
                          Note: time section will be what we base off to notify
                          you
                        </p>
                      </div>
                      <div
                        className={cn(
                          type === "Recurring" ? "hidden" : "block",
                          "sm:col-span-3"
                        )}
                      >
                        <FormInput
                          type="datetime-local"
                          label="One Time Date"
                          {...form.register("oneTimeDate", {
                            valueAsDate: true,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="ml-3 px-4"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isLoading ? "Saving" : "Save"}
                      {/* Save */}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </main>

      <SuccessModal
        buttonText="Go back to dashboard"
        onClick={() => {
          void router.push("/dashboard");
        }}
        onClose={(option) => setModalOpen(option)}
        open={modalOpen}
        text="We will notify you shortly via email"
        title="Created Bill"
      />
    </div>
  );
};

export default CreateBillPage;
