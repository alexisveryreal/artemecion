import { z } from "zod";
import { Form, useZodForm } from "../components/forms/Form";
import { FormInput } from "../components/forms/FormInput";
import { Button } from "../components/ui/Button";

const schema = z.object({
  name: z.string(),
});

const CreateBillPage = () => {
  const form = useZodForm({
    schema,
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className="min-h-screen py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
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
                        This is the general info for each bill
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <FormInput
                          type="text"
                          label="Name"
                          {...form.register("name")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button type="button" variant="outline" className="px-4">
                      Cancel
                    </Button>
                    <Button type="submit" className="ml-3 px-4">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
            {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
            content hereeee
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBillPage;
