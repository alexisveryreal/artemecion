import { useController } from "react-hook-form";
import { z } from "zod";
import { Form, useZodForm } from "../components/forms/Form";
import { FormInput } from "../components/forms/FormInput";
import { FormOptionGroup } from "../components/forms/FormOptionGroup";
import { FormTextarea } from "../components/forms/FormTextarea";
import { Button } from "../components/ui/Button";
import type { Options } from "../components/ui/OptionGroup";
import { OptionGroup } from "../components/ui/OptionGroup";
import { api } from "../utils/api";

const schema = z.object({
  name: z.string().min(1, "Name must have at least one character"),
  description: z.string().nullable(),
  amount: z.coerce
    .number({
      invalid_type_error: "Please enter only numbers",
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be greater than 0"),
  type: z.string(),
});

const options: Options[] = [
  {
    name: "One Time",
    description: "This is a one off bill",
  },
  {
    name: "Recurring",
    description: "This bill will happen every month, year, etc",
  },
];

const CreateBillPage = () => {
  const form = useZodForm({
    schema,
    defaultValues: {
      type: "Recurring",
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
                    </div>
                  </div>
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-zinc-900">
                        Bill type
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        What type of bill is this?
                      </p>
                    </div>
                    <div className="my-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <FormOptionGroup
                          label="Bill Type"
                          name="type"
                          control={form.control}
                          options={options}
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
                    <Button type="submit" className="ml-3 px-4">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBillPage;
