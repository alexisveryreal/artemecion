import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { Form, useZodForm } from "../../components/forms/Form";
import { FormInput } from "../../components/forms/FormInput";
import { FormOptionGroup } from "../../components/forms/FormOptionGroup";
import { SuccessModal } from "../../components/SuccessModal";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";
import { cn } from "../../utils/cn";
import { billCreateSchema, options } from "../create-bill";

// same validation as bill creation but id field from the bill-id
export const editBillSchema = billCreateSchema.merge(
  z.object({
    id: z.string(),
  })
);

const EditBillPage = () => {
  const router = useRouter();
  const billId = router.query["bill-id"] as string;
  const [modalOpen, setModalOpen] = useState(false);

  const { data: bill, isLoading: isGettingBill } = api.bill.getBill.useQuery(
    { id: billId ?? "" },
    {
      enabled: !!billId,
      retry: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      onSuccess(data) {
        form.setValue("amount", data.amount);
        form.setValue(
          "billDate",
          data.billDate.toJSON().slice(0, 10) as unknown as Date
        );
        form.setValue("name", data.name);
        form.setValue("type", data.type);
        form.setValue("url", data.url);
        form.setValue("id", billId);
      },
    }
  );

  const { mutate: editBill, isLoading } = api.bill.edit.useMutation({
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  const form = useZodForm({
    schema: editBillSchema,
  });

  return (
    <div className="min-h-screen py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900">
            Edit Bill
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            {isGettingBill ? (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Form
                form={form}
                onSubmit={(data) => {
                  console.log(data);
                  editBill({
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
                          <FormOptionGroup
                            label="Bill Type"
                            name="type"
                            control={form.control}
                            options={options}
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <FormInput
                            type="text"
                            label="Site Url"
                            {...form.register("url")}
                          />
                          <p className="mt-2 text-sm text-zinc-500">
                            Please include https://
                          </p>
                        </div>

                        <div className={cn("sm:col-span-3")}>
                          <FormInput
                            type="date"
                            label="Bill Date"
                            {...form.register("billDate")}
                          />
                          <p className="mt-2 text-sm text-zinc-500">
                            What day was this bill paid/will be paid
                          </p>
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
                        onClick={() =>
                          form.reset({
                            ...bill,
                            billDate: bill?.billDate
                              .toJSON()
                              .slice(0, 10) as unknown as Date,
                          })
                        }
                      >
                        Reset
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
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
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
        text="Congrats, visit the dashboard to see your bill"
        title="Edited Bill"
      />
    </div>
  );
};

export default EditBillPage;
